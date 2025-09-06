import { fetchNotes } from "@/lib/api";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NotesClient from "./Notes.client";

const Notes = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["notes"],
		queryFn: () => fetchNotes("", 1),
	});
	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<NotesClient />
			</HydrationBoundary>
		</div>
	);
};

export default Notes;
