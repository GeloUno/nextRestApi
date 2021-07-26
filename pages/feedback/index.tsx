import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps } from "next";
import { IDataResponseHandler, IFeedbackData } from '../api/feedback';
import { Fragment } from 'react';
import Link from 'next/link';;



interface IStaticProps {
    feedback: Array<IFeedbackData>
}
interface IStaticPath extends ParsedUrlQuery {

}
export const URL_FEEDBACK = 'http://localhost:3000/api/feedback'

function FeedbackPage({ feedback }: IStaticProps) {
    return (
        <Fragment>
            <Link href='/'>
                <button >home</button>
            </Link>

            <ul>
                {feedback.length > 0 && (
                    feedback.map((element) => {
                        return (
                            <li key={element.id}>
                                <h3>{element.email}
                                    <p>{element.text}</p>
                                </h3>
                            </li>
                        )
                    })
                )}
            </ul>
        </Fragment>
    );
}

export default FeedbackPage;

export const getStaticProps: GetStaticProps<IStaticProps, IStaticPath> = async () => {
    const dataFeedback: Array<IFeedbackData> = []

    const feedbackDataFromServer = await fetch(URL_FEEDBACK, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data: IDataResponseHandler = await feedbackDataFromServer.json()

    const feedback: IFeedbackData[] = data.feedback as IFeedbackData[];

    return {
        props: {
            feedback: feedback
        }
    }
}