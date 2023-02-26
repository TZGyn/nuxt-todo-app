const submitNote = async (
	note: Note,
	query: NoteQuery
): Promise<ApiResponse> => {
	let response: ApiResponse = {
		status: 200,
		message: 'Update',
		error: null,
	}

	await useFetch('/api/note', {
		method: 'POST',
		query,
		body: note,
		onResponse({ response }) {
			console.log('POST:', response._data.message)
			response = response._data
		},
	})

	return response
}

const useNote = () =>
	useState<Note>('note', () => Object({ title: '', description: '' }))

export { submitNote, useNote }
