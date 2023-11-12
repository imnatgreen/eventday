export const reqConfig = {
	method: 'GET',
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
		Cookie: 'parkrun-results-table-display-preference=detailed; cookiesDisclosureCount=2',
		Accept:
			'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
		Dnt: '1',
		'Upgrade-Insecure-Requests': '1',
		Referer: 'https://www.google.co.uk'
	}
};

export const firstName = (name: string) => name.split(' ')[0];

export const titleCase = (str: string) => {
	return str.replace(/\b\w+/g, (s) => {
		return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
	});
};
