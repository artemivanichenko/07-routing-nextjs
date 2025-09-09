import axios from "axios";
import { type Note, type NoteTag } from "../types/note";

const axiosInst = axios.create({
	baseURL: "https://notehub-public.goit.study/api",
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
	},
});

interface fetchNotesProps {
	notes: Note[];
	totalPages: number;
}
interface newTaskProp {
	title: string;
	content: string;
	tag: NoteTag;
}

export const fetchNotes = async (
	search: string,
	page: number,
	tag: string
): Promise<fetchNotesProps> => {
	const params = {
		params: {
			page,
			perPage: 12,
			search,
			...(tag && { tag }),
		},
	};

	const fetchNotesResponse = await axiosInst.get<fetchNotesProps>(
		"/notes",
		params
	);
	return fetchNotesResponse.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
	const fetchNotesResponse = await axiosInst.get<Note>(`/notes/${id}`);
	return fetchNotesResponse.data;
};

export const createNote = async (newTask: newTaskProp): Promise<Note> => {
	const createNoteResponse = await axiosInst.post("/notes", newTask);
	return createNoteResponse.data;
};

export const deleteNote = async (taskID: string): Promise<Note> => {
	const deleteNoteResponse = await axiosInst.delete(`/notes/${taskID}`);
	return deleteNoteResponse.data;
};
