"use client";

const NoteDetailsError = ({ error }: { error: Error }) => {
	return <p>Could not fetch note details. {error.message}</p>;
};

export default NoteDetailsError;
