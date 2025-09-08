import { fetchNotes } from "@/lib/api";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NotesClient from "./Notes.client";

interface NotesProps {
	params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
	const queryClient = new QueryClient();
	const { slug } = await params;

	const tag = slug[0] === "All" ? "" : slug[0];
	// console.log(status);

	await queryClient.prefetchQuery({
		queryKey: ["notes", tag],
		queryFn: () => fetchNotes("", 1, tag),
	});
	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<NotesClient tag={tag} />
			</HydrationBoundary>
		</div>
	);
};

export default Notes;
