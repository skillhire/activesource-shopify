
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}

export default async function middleware(req) {
	const url = req.nextUrl
	let { pathname } = url

	// Get hostname (e.g. vercel.com, test.vercel.app, etc.)
	let hostname = req.headers.get('host') || ''
	let subdomain = null
	let topLevelDomain = hostname?.split('.').slice(-2).join('.')

	// Always remove port for dev environment
	hostname = hostname.split(':')[0]

	const isCustomDomain =
		hostname != 'www.activesourcelab.com' &&
		hostname != 'activesourcelab.com' &&
		hostname != 'localhost'

	// Example: my-subdomain.frontend.co
	if (isCustomDomain && topLevelDomain == 'activesourcelab.com') {
		subdomain = hostname?.split('.')[0]
	} else if (isCustomDomain) {
		// www.mydomain.com -> mydomain-com.activesourcelab.com
		subdomain = hostname
	}
	// process.env.NODE_ENV === "production" indicates that the app is deployed to a production environment
	// process.env.VERCEL === "1" indicates that the app is deployed on Vercel

	//@ts-ignore
	if (subdomain) {
		let storefrontHandle = subdomain.replaceAll('.', '-')		
		return NextResponse.rewrite(
			new URL(`/storefronts/${storefrontHandle}${pathname}`, req.url)
		)
	} else {
		return NextResponse.next()
	}
}
