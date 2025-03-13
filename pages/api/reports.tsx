import {NextApiRequest, NextApiResponse} from 'next';
import clientPromise from "@/lib/mongodb";
import {IReport} from "@/interfaces/interfaces";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const reports = await getReports();
            res.status(200).json(reports);
            break;
        case "POST":
            const report = req.body as IReport;
            const result = await addReport(report);
            res.status(201).json(result);
            break;
        default:
            res.status(405).end();
            break;
    }
}

async function getReports() {
    try {
        const client = await clientPromise;
        const db = client.db("reports_db");
        return await db
            .collection("reports")
            .find({})
            .sort({metacritic: -1})
            .toArray()
    } catch (e) {
        console.error(e);
    }
}

async function addReport(report: IReport) {
    try {
        const client = await clientPromise;
        const db = client.db("reports_db");
        return await db.collection("reports").insertOne(
            {
                place: report.place,
                square: report.square,
                description: report.description,
                amountAndType: report.amountAndType
            }
        );
    } catch (e) {
        console.error(e);
    }
}

export default handler;
