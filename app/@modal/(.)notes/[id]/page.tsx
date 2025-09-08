import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import NotePreviewDetails from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";

interface NotePreviewPageProps {
	params: Promise<{ id: string }>;
}

const ModalPreview = async ({ params }: NotePreviewPageProps) => {
	const { id } = await params;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotePreviewDetails />
		</HydrationBoundary>
	);
};

export default ModalPreview;
