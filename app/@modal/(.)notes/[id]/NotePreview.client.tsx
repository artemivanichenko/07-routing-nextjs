"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const NotePreviewDetails = () => {
	const router = useRouter();
	const handleClose = () => router.back();

	const { id } = useParams<{ id: string }>();
	const { data, isLoading, error } = useQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
		refetchOnMount: false,
	});

	return (
		<Modal onClose={handleClose}>
			{data && <NotePreview note={data} />}
			{isLoading && <p>Loading...</p>}
			{error && <p>Error 😅</p>}
		</Modal>
	);
};

export default NotePreviewDetails;
