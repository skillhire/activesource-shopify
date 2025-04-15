### ActiveSource

This is the ActiveSource headless eCommerce storefront. This client front-end was built using NextJS, Apollo, Shopify GraphQL Storefront APIs, and MUI react library.

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
- Home
```

The queries for metaobjects can be found in /hooks. Note that metafields are only returned if they are specifically included in the GraphQL, specifically for Products in the `graphql/shopify/products.js`

### Vercel Hosting

This front-end is hosted on Vercel. All commits to `main` and `staging` will result in an auto-deploy to the prod and staging sites respectively.

### Customization

A major feature of ActiveSource is the ability to have apparel customization by adding a logo at a specific placement:

- Front
- Back

### Monster digital order fulfillment

Each line item added to the Cart passes a set of attributes that are required by Monster Digital, the order fulfillment center, to make a digital print:

```
_print_sku
_print_location_1
_print_preview_1
_print_url_1
_print_type_1
_file_extension_1
_print_location_2
_print_preview_2
_print_url_2
_print_type_2
_file_extension_2
```

print_location is a 2-letter code that designates the location and is one of:

```
CF – Front
FB – Back
LC - Left chest (limited to a 4x4 print size)
BN – Back of neck
```

print_preview is a composite image of the logo and the apparel item. This image is generated using an HTML canvas in the `Canvas` component.

print_url is a png image of the logo that is printed.

print_type should always be "DigitalPrint"

file_extension should always be `png` to support transparencies.

Note the "\_" prefix is appended to hide the custom attribute from the Shopify Cart, and must be removed before the order is passed to Monster Digital.

### DPI printer resolution

DPI is a printer metric (dots per inch) that is stored as metadata in an image. We assume that all images will be printed at 300 DPI by assuming 300 PPI (pixels per inch) as a proxy.

All metadata tags associated with DPI should be ignored.

All logo images are resized based on the placement dimensions required using Cloudinary. Resizing may reduce image quality if the original image was uploaded at a lower resolution then what was rescaled.

### Custom variant options

In order to associate a placement image with a product color, we use a metaobject called Color to hold:

- Hex color value
- Label
- Front placement image
- Back placement image

Each product should also have a corresponding Color value in Shopify that matches the name field of the Color metaobject. This is necessary to generate a unique SKU for each product.
