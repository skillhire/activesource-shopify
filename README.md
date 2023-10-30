### ActiveSource

This is the ActiveSource headless eCommerce storefront. This client front-end was built using NextJS, Apollo, Shopify APIs, and MUI (Material UI).

### Installation

Install using yarn:

```
yarn
```

Copy the env variables from the sample file to your local, and replace the placeholder with the Shopify storefront token:

```
cp env-sample.txt .env.local
```

Ensure to get the appropriate storefront graphQL API tokens in order to access the store.

### Node v18

This app currently runs on Node v18. If you have issues running with
Node 18 it is also compatible with Node v16+

### Shopify Integration

The majority of integration required to operate a Shopify storefront is already setup using the Shopify Storefront GraphQL APIs. There are a number of graphql queries in `/graphql` and corresponding hooks in `/hooks` that are used to interact with the Shopify Store.

There are number of pre-built components that use these hooks to issue queries or mutations, but if necessary you can also fetch data directly using hooks.

Below is a an example of fetching products:

```
const router = useRouter()
const { handle } = router.query

const {
  loading,
  error,
  product,
  fetchProduct
} = useProducts()

useEffect(() => {
  if(handle){
    fetchProduct(handle)
  }
}, [handle])

render(
  <Box>
    { product ? product.title : 'loading...' }
  </Box>
)
```

### Shopify Metaobjects and Metafields

This project also uses several Shopify Metafields and Metaobjects to make pages customizable from the Shopify Admin. These are very flexible
data objects that help extend the native capabilities of a Shopify store. The metaobjects used include:

```
- Color
- Placement
```

The queries for metaobjects can be found in /hooks. Note that metafields are only returned if they are specifically included in the GraphQL, specifically for Products in the `graphql/shopify/products.js`

### Vercel Hosting

This front-end is hosted on Vercel. All commits to `main` and `staging` will result in an auto-deploy to the prod and staging sites respectively.

### Customization

A major feature of ActiveSource is the ability to have apparel customization by adding a logo at a specific placement:

- Front
- Back

### Bitly sharing and order fulfillment

Customizations all have a unique URL which is encoded as a JWT token, then using Bit.ly to create a short URL of the fully resolved URL with the JWT token as a URL param.

When adding a customization to Cart, this URL is also added as a Shopify custom attribute to the line item so that the Order can be fullfilled.

### Custom variant options

In order to associate a placement image with a product color, we use a metaobject called Color to hold:

- Hex color value
- Label
- Front placement image
- Back placement image
