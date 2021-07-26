import fs from 'fs'
import path from 'path'
import { NextApiResponse, NextApiRequest } from 'next';

export interface IDataResponseHandler {
    message: string,
    feedback?: Array<IFeedbackData> | IFeedbackData
}
export interface IFeedbackData {
    id: string,
    email: string,
    text: string
}

const getDataFeedbackFromFile = (filePath: fs.PathOrFileDescriptor) => {
    const fileData = fs.readFileSync(filePath);
    return fileData
}

const getDataJsonFromBufferFeedback = (fileData: Buffer): IFeedbackData[] => {
    return JSON.parse(fileData.toString())
}

const filePath = path.join(process.cwd(), 'data', 'feedback.json')

function handler(req: NextApiRequest, res: NextApiResponse<IDataResponseHandler>) {
    if (req.method === "POST") {
        const email = req.body.email;
        const feedbackText = req.body.text

        const newFeedback: IFeedbackData = {
            id: new Date().toISOString(),
            email,
            text: feedbackText,
        }



        const fileData = getDataFeedbackFromFile(filePath)

        const data: Array<IFeedbackData> = getDataJsonFromBufferFeedback(fileData)

        data.push(newFeedback)

        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({
            message: "Success",
            feedback: newFeedback
        })
    } else {
        const dataFile = getDataFeedbackFromFile(filePath)

        const data: Array<IFeedbackData> = getDataJsonFromBufferFeedback(dataFile)

        res.status(200).json({ message: 'work', feedback: data })
    }
}

export default handler