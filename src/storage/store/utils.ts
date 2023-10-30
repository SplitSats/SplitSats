export function cTo<T extends object>(s: string) {
	return JSON.parse(s) as T
}

export function toJson<T extends object>(o: T) {
	return JSON.stringify(o)
}