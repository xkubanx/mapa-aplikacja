"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {IReport, ModalProps} from "@/interfaces/interfaces";
import {useState} from "react";
import {api} from "@/lib/axios";

const addReport = async (description: string, amountAndType: string, selectedSquare: string, map: string) => {
    try {
        const data: IReport = {
            place: map,
            square: selectedSquare,
            description: description,
            amountAndType: amountAndType
        }
        await api.post("/api/reports", data);
    } catch (e) {
        console.error(e)
    }
}


export function ModalComponent({isOpen, onClose, selectedSquare, map}: ModalProps) {
    const [description, setDescription] = useState<string>('')
    const [amountAndType, setAmountAndType] = useState<string>('')

    return (
        <Dialog onOpenChange={onClose} open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Dodaj dane</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div className="grid py-4 gap-4">
                    <div className="flex flex-col gap-4">
                        <p>{map} {selectedSquare?.xLabel}{selectedSquare?.yLabel}</p>
                        <Label htmlFor="description" className="text-right">
                            Opisz dokładnie miejsce
                        </Label>
                        <Input
                            id="description"
                            placeholder="Opisz dokładnie miejsce"
                            className=""
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="amountAndType" className="text-right">
                            Ilosć, rodzaj śmieci
                        </Label>
                        <Input
                            id="amountAndType"
                            placeholder="Ilosć, rodzaj śmieci"
                            className=""
                            onChange={(e) => setAmountAndType(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={() => {
                            addReport(description, amountAndType, `${selectedSquare?.xLabel}${selectedSquare?.yLabel}`, map)
                            onClose()
                        }}
                    >
                        Zatwierdź
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
