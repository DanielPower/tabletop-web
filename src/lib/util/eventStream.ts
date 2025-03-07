export const subscribe = async (
	callback: (message: any) => void,
	options?: { isAdmin?: boolean },
) => {
	const url = options?.isAdmin
		? `${window.location.href}/admin/events`
		: `${window.location.href}/events`;
	const response = await fetch(url);
	const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();

	while (true) {
		const { value, done } = await reader.read();
		if (done) break;
		callback(JSON.parse(value));
	}
};
