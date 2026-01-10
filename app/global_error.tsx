// app/global-error.tsx
"use client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<body>
				<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
					<div className="text-center p-8">
						<h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
						<button
							onClick={() => reset()}
							className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
						>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}
