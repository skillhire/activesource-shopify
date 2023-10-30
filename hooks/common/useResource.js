import { useContext, useEffect, useState } from "react";
import { ApiContext } from "context";
import { useAlerts, useLoaders } from "hooks";

/* useResource
  A base hook that allows for CRUD operations of a REST API that follows
  standard REST patterns of GET POST PUT and DELETE to create, update, create and
  destroy objects.

  @param id - The resource ID to auto fetch
  @param url - The API endpoint. The is set dynamically using setEndpoint
  @param name - The name of the resource needed when using POST and PUT
*/

const useResource = ({ url = "/", name, ...props }) => {
  const { api } = useContext(ApiContext);

  const { isLoading, showLoading, hideLoading } = useLoaders();
  const { showAlertError } = useAlerts();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [id, setId] = useState(props.id);
  const [resource, setResource] = useState({ id: props.id });
  const [resources, setResources] = useState([]);
  const [meta, setMeta] = useState({});
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [numPages, setNumPages] = useState(1);

  const [sortKey, setSortKey] = useState(`${name}s.id`);
  const [sortDirection, setSortDirection] = useState("desc");

  const [totalCount, setTotalCount] = useState(0);
  const [errors, setErrors] = useState([]);

  const findOne = async (id, params = {}) => {
    if (!id) showAlertError("No ID was provided");
    try {
      showLoading();
      setIsLoaded(false);
      setId(id);
      const res = await api.get(`${url}/${id}`, params);
      setResource(res.data);
      setMeta(res.meta);
      setIsLoaded(true);
      hideLoading();
      return res.data;
    } catch (e) {
      handleErrors(e);
    }
    hideLoading();
  };

  const findMany = async (params, page = 1, loadMore = false) => {
    try {
      showLoading();
      setParams(params);
      setPage(page);
      if (!loadMore) {
        setIsLoaded(false);
      }
      const res = await api.get(url, {
        params: {
          ...params,
          page,
        },
      });
      hideLoading();
      if (res.data) {
        if (!loadMore) {
          setResources(res.data);
        } else {
          setResources([...resources, ...res.data]);
        }
        if (res.meta) {
          setMeta(res.meta);
          setPage(res.meta.page);
          setPerPage(res.meta.per_page);
          setNumPages(res.meta.num_pages);
          setTotalCount(res.meta.total_count);
        }
        setIsEmpty(res?.data?.length > 0 ? false : true);
        setIsLoaded(true);
        return res.data;
      }
    } catch (e) {
      hideLoading();
      handleErrors(e);
    }
  };

  const loadMore = () => {
    let nextPage = page + 1;
    let appendResults = true;
    findMany(params, nextPage, appendResults);
  };

  const save = (resource, showLoaders = true) => {
    if (resource?.id) {
      return update(resource, showLoaders);
    } else {
      return create(resource, showLoaders);
    }
  };

  const create = async (resource, showLoaders = true) => {
    try {
      if (showLoaders) showLoading();
      const res = await api.post(url, {
        [name]: resource,
      });
      if (res.data && res.data.id) {
        setResource(res.data);
        setIsLoaded(true);
        setId(res.data.id);
      }
      hideLoading();
      return res.data;
    } catch (e) {
      showAlertError("There was an issue saving");
      handleErrors(e);
    }
  };

  const update = async (resource, params = {}) => {
    setId(resource.id);
    try {
      showLoading();
      const res = await api.put(`${url}/${resource.id}`, {
        [name]: resource,
        ...params,
      });
      hideLoading();
      return res.data;
    } catch (e) {
      handleErrors(e);
    }
  };

  const destroy = async (resourceId) => {
    try {
      showLoading();
      const res = await api.delete(`${url}/${resourceId}`);
      setResource({ data: {} });
      hideLoading();
    } catch (e) {
      handleErrors(e);
    }
  };

  const paginate = (page) => findMany(params, page);

  const handleChange = (ev) => {
    const { name } = ev.target;
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setResource({
      ...resource,
      [name]: value,
    });
  };

  const handleErrors = (e) => {
    hideLoading();
    setIsLoaded(false);
    setErrors(e);
    console.error("useResource Error:", e);
    if (e?.status == 401) {
      showAlertError("Please Sign In to continue");
      localStorage.removeItem("token");
      setTimeout(() => (window.location.href = "/login"), 1000);
    }
    return false;
  };

  const reloadOne = () => findOne(id);
  const reloadMany = () => findMany(params);

  const handleSort = (sortBy) => {
    sortDirection == "asc" ? setSortDirection("desc") : setSortDirection("asc");
    setSortKey(sortBy);
  };

  useEffect(() => {
    if (props.id) setId(props.id);
  }, [props.id]);

  return {
    id,
    isLoading,
    isLoaded,
    isEmpty,
    resource,
    resources,
    setResource,
    setResources,
    errors,
    meta,
    findOne,
    findMany,
    save,
    update,
    create,
    destroy,
    paginate,
    loadMore,
    handleChange,
    params,
    page,
    perPage,
    numPages,
    totalCount,
    reloadOne,
    reloadMany,
    sortKey,
    sortDirection,
    handleSort,
  };
};

export default useResource;
