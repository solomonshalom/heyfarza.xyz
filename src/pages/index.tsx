import type { GetStaticProps } from 'next'
import * as React from 'react'
import { Container, Heading, Link, Text } from 'theme-ui'
import getStats, { Book, Stats } from '../lib/getStats'
import pluralize from '../lib/pluralize'


interface ValueCountProps {
    value: number
    singular: string
    plural: string
}

const ValueCount: React.FC<ValueCountProps> = ({ value, singular, plural }) => (
    <React.Fragment>
        {value.toLocaleString()} {pluralize(value, singular, plural)}
    </React.Fragment>
)

interface FormattedBookProps {
    book: Book
}

const FormattedBook: React.FC<FormattedBookProps> = ({ book }) => (
    <React.Fragment>
        &ldquo;{book.name}&rdquo; by {book.author}
    </React.Fragment>
)

interface BooksToSentenceProps {
    books: Array<Book>
}

const BooksToSentence: React.FC<BooksToSentenceProps> = ({ books }) => {
    if (books.length === 1) return <FormattedBook book={books[0]} />

    if (books.length === 2)
        return (
            <React.Fragment>
                <FormattedBook book={books[0]} /> and <FormattedBook book={books[1]} />
            </React.Fragment>
        )

    return (
        <React.Fragment>
            {books.map((book, index) => {
                if (index === 0) return <FormattedBook book={book} />

                if (index + 1 === books.length) {
                    return (
                        <React.Fragment>
                            , and <FormattedBook book={book} />
                        </React.Fragment>
                    )
                }

                return (
                    <React.Fragment key={book.name}>
                        , <FormattedBook book={book} />
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
}

interface IndexProps {
    stats: Stats
}

const IndexPage: React.FC<IndexProps> = ({ stats }) => {
    const {
        commits = 0,
        tweets = 0,
        steps = 0,
        places = 0,
        songs = 0,
        album = null,
        books = [],
    } = stats

    return (
        <Container>
            <Text as="p" variant="section-heading" mb={3}>
                Introduction
            </Text>

            <Text as="div" variant="site-intro" sx={{ display: 'contents' }}>
                <Heading as="h1" variant="site-intro" sx={{ fontWeight: 'bold' }}>
                    A letter to Microsoft&apos;s Azure
                    <Link href="/trade" sx={{ textDecoration: 'none' }}>
                        <span role="img" aria-label="palm tree emoji">🌴</span>
                    </Link>
                </Heading>
                <br /><br />

                <Text as="p" variant="site-intro">
                    Hey Farza,
                    <br /><br />
                    Hope you’re doing great!<br /><br />

                    I heard you’re putting together your dream team — love that. Thought I’d shoot my shot.
                    <br /><br />

                    I’m Solomon, a senior in high school from India.
                    <br /><br />

                    Been building things since I got my first LEGO set — I loved stacking bricks, and eventually that turned into stacking code.
                    <br /><br />

                    Over the years, I got into a bunch of things, mostly tiny businesses.<br />
                    Once imported die-cast cars from Italy through eBay and sold them here in India — that kicked it all off.<br />
                    Built an <Link href="https://play.google.com/store/apps/details?id=ml.opmworkout.opm" target="_blank" rel="noopener">app inspired by One Punch Man</Link>, and launched an <Link href="https://opensea.io/collection/peeps-and-founders" target="_blank" rel="noopener">NFT collection</Link> <i>(we brought in models + used AI to create visuals for the NFTs — wild times)</i>. It didn’t hit the moon, but it was a blast!
                    <br /><br />

                    Used to be the <Link href="https://www.bbb.bot/" target="_blank" rel="noopener">CTO of a GovTech startup</Link> — learned a lot about systems, impact, and what it takes to build for the real world.
                    <br /><br />

                    Since then, I’ve just kept building.<br />
                    Launched a <Link href="https://zxe.solomonlijo.com" target="_blank" rel="noopener">dev studio for micro-apps and landing pages</Link>, tried vibe coding, and even sold an app through it.
                    <br /><br />

                    Right now? I’m building an <Link href="https://justice.rest" target="_blank" rel="noopener">LLM-powered interface for the legal world</Link> and a community that brings together those deprived of justice with those who can deliver it — making the law accessible, human, and built for everyone.
                    <br /><br />

                    If I had to TLDR my experience so far: some projects took off, others didn’t — but I kept building, shipping, and learning.
                    <br /><br />

                    Peace,<br />
                    <Link href="https://solomonlijo.com" target="_blank" rel="noopener">Solomon Shalom Lijo</Link>
                </Text>
            </Text>
        </Container>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const stats = await getStats()

    return {
        props: {
            stats,
        },
        revalidate: 60 * 60, // revalidate at most once per hour
    }
}

export default IndexPage
