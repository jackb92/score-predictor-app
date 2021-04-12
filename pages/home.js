import useSWR from 'swr';
import Fixture from '../components/fixtures';
import Header from '../components/Header';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
	const { data, error } = useSWR('/api/fixtures', fetcher);

	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;

	return (
		<div>
			<Header />
			{data.map((fixture) => (
				<Fixture fixture={fixture} />
			))}
		</div>
	);
}
