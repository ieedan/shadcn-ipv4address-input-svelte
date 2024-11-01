import IPv4AddressInput from './ipv4address-input.svelte';

export const isNumber = (num: unknown): boolean => {
	if (typeof num === "number") {
		return num - num === 0;
	}
	if (typeof num === "string" && num.trim() !== "") {
		return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
	}
	return false;
};

export type IPv4Address = [number | null, number | null, number | null, number | null];

export { IPv4AddressInput };
