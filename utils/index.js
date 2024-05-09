// Metafield helpers
export const getField = (object, key) => {
  return object?.fields?.find((field) => field?.key == key);
};

export const getValue = (object, key) => {
  let field = getField(object, key);
  return field?.value;
};

export const getImage = (object, key) => {
  let field = getField(object, key);
  return field?.reference?.image?.url;
};

export const getMetafield = (metaobject, key) => {
  return metaobject?.metafields?.find((field) => field?.key == key);
};

export const getMetaValue = (metaobject, key) => {
  let field = getMetafield(metaobject, key);
  return field?.value;
};

export const getMetaImage = (metaobject, key) => {
  let field = getMetafield(metaobject, key);
  return field?.reference?.image?.url;
};

export const getMetaReference = (metaobject, key) => {
  let field = getMetafield(metaobject, key);
  return field?.reference;
};

export const getMetaReferences = (metaobject, key) => {
  let field = getMetafield(metaobject, key);
  return field?.references?.edges.map((e) => e.node);
};

export const getArrayFromString = (stringArray) => {
  let jsonValues = JSON.parse(`{ "values": ${stringArray} }`);
  return jsonValues?.values;
};

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const shopifyResizeImage = (url, height, width) => {
  if (!url) return;
  let extension = url.split(".").pop();
  let filePath = url.split(`.${extension}`)[0];
  let resizedUrl = `${filePath}_${width}x${height}.${extension}`;
  return resizedUrl;
};

// https://cloudinary.com/documentation/resizing_and_cropping
export const cloudinaryResizeImage = (src, { width, height, transform = 'pad' }) => {
	if (!src) return null
	let index = src.indexOf('/upload') + 7 // 7 is number of chars in '/upload'
	let params = [`/c_${transform}`]
	if (width && width > 0) params.push(`w_${width}`)
	if (height && height > 0) params.push(`h_${height}`)
	let transformedUrl =
		src.substring(0, index) + params.join(',') + src.substring(index)
	return transformedUrl
}


export const formatCurrency = (money, digits = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(money);
};

export const formatPriceRange = (min, max) => {
  if (!max || !min || min === max) {
    return formatCurrency(min);
  }
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

// Shopify will render single SKU products with title 'Default Title'
export const renderMerchandiseTitle = (merchandise) => {
  if (merchandise?.title != "Default Title") {
    return merchandise?.title;
  } else {
    return merchandise?.product?.title;
  }
};

export const renderLineItemPrice = (line) => {
  if (line?.sellingPlanAllocation) {
    return formatCurrency(
      line?.sellingPlanAllocation?.priceAdjustments[0]?.price?.amount
    );
  } else {
    return formatCurrency(line?.merchandise?.price?.amount);
  }
};

export const renderLineItemCompareAtPrice = (line) => {
  if (line?.sellingPlanAllocation) {
    return formatCurrency(
      line?.sellingPlanAllocation?.priceAdjustments[0]?.compareAtPrice?.amount
    );
  } else {
    return formatCurrency(line?.merchandise?.price?.amount);
  }
};

const decodeBase64 = (data) => {
  return Buffer.from(data, "base64").toString("ascii");
};

export const getBase64DecodedId = (id) => {
  let orderGid = decodeBase64(id);
  let orderId = orderGid.split("/").at(-1);
  return orderId.split("?")[0];
};

// NextJS Image has trouble rendering SVG icons if file ext does not end in .svg
// such as ?variant=1234567890 so a fix here is to strip params from url
export function stripParams(src) {
  return src?.split("?")[0];
}

export function getProductColors(product) {
  let _colors = product.metafields
      .find((metafield) => metafield?.key === "colors")
      ?.references.edges.map((e) => e.node);
  let formattedColors = _colors?.map((color) => ({
    id: color?.id,
    hex: getValue(color, "color"),
    name: getValue(color, "name"),
    front_placement: getImage(color, "front_placement"),
    back_placement: getImage(color, "back_placement"),
    print_location_1: getValue(color, "print_location_1"),
    print_url_1: getValue(color, "print_url_1"),
    print_preview_1: getValue(color, "print_preview_1"),
    print_location_2: getValue(color, "print_location_2"),
    print_url_2: getValue(color, "print_url_2"),
    print_preview_2: getValue(color, "print_preview_2"),
  }));
  return formattedColors;
}

export function dataURLtoFile(dataurl, filename) {
  // Split the data URL at the comma to separate the base64 encoding from the rest
  let arr = dataurl.split(','), 
      mime = arr[0].match(/:(.*?);/)[1], // Extract the mime type
      bstr = atob(arr[1]), // Decode the base64 string
      n = bstr.length, 
      u8arr = new Uint8Array(n); // Create an 8-bit unsigned array
  // Convert the decoded string into a character-coded array
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  // Create a Blob from the Uint8Array 
  let file = new File([u8arr], filename, {type: mime});
  // Generate an image URL from the file
  //let url = URL.createObjectURL(file)    
  return file
}
