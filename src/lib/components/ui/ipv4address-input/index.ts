import IPv4AddressInput from './ipv4address-input.svelte';

export const isNumber = (num: unknown): boolean => {
	if (typeof num === 'number') {
		return num - num === 0;
	}
	if (typeof num === 'string' && num.trim() !== '') {
		return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
	}
	return false;
};

/** Attempts to parse the provided address into a valid IP. Returns undefined for
 * undefined returns a valid IP in array form for a valid IP and returns a 0 filled array for a incomplete IP.
 *
 * **This is used only for parsing the placeholder**
 *
 * @param ipv4Address IP Address string to be parsed can be `0.0.0.0` or `0 0 0 0` or `0_0_0_0` or `0 0 0` (partially complete)
 * @returns
 */
export const safeParseIPv4Address = (
	ipv4Address: string | undefined
): [string, string, string, string] | undefined => {
	if (ipv4Address === undefined) return undefined;
	let ip = ipv4Address.trim();

	ip = ip.replaceAll('_', '.');
	ip = ip.replaceAll(' ', '.');

	const segments = ip.split('.');

	while (segments.length < 4) {
		segments.push('0');
	}

	// @ts-expect-error We know this is 4 we just made sure
	return segments;
};

export type IPv4Address = [number | null, number | null, number | null, number | null];

export { IPv4AddressInput };
