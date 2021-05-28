// our-domain.com/news
import Link from 'next/link';

function NewsPage() {
    return (
        <>
            <h1>The News Page</h1>
            <ul>
                <li>
                    <Link href='/news/aboulmgd-framework'>aboulmgd framework</Link>
                </li>
                <li>something else</li>
            </ul>
        </>
    );
}

export default NewsPage;