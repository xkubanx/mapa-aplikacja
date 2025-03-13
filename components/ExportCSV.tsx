"use client"

import {IReport} from "@/interfaces/interfaces";
import {Button} from "@/components/ui/button";
import {api} from "@/lib/axios";
import {AxiosError} from "axios";

const getReports = async () => {
    try {
        const response = await api.get<IReport[]>("/api/reports");
        return response.data;
    } catch (e) {
        if(e instanceof AxiosError){
            console.error(e.response?.data)
        }
    }
}

export const ExportCSV = ({fileName}: { fileName: string }) => {
    const headers = [
        {label: "Nazwa miejsca", key: "place"},
        {label: "Kwadrat", key: "square"},
        {label: "Opis miejsca", key: "description"},
        {label: "Ilość, rodzaj śmieci", key: "amountAndType"},
    ];

    const downloadCSV = async () => {
        // Convert the data array into a CSV string
        const data = await getReports();
        if(data) {
            const csvString = [
                ["\uFEFF"], // BOM (Byte Order Mark)
                [headers[0].label, headers[1].label, headers[2].label],
                ...data.map(item => [item.place, item.square, item.description, item.amountAndType]),
            ]
                .map(row => row.join(","))
                .join("\n");

            // Create a Blob from the CSV string
            const blob = new Blob([csvString], {type: 'text/csv'});

            // Generate a download link and initiate the download
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName || 'download.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    return <Button onClick={downloadCSV}>Eksportuj CSV</Button>;
};