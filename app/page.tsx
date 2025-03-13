"use client"

import {useLayoutEffect, useRef, useState} from "react";
import {MapEnum, SquareProps} from "@/interfaces/interfaces";
import {createSquares} from "@/lib/utils";
import {ExportCSV} from "@/components/ExportCSV";
import {ModalComponent} from "@/components/ModalComponent";
import {Button} from "@/components/ui/button";

import "./index.css"

const x = 25
const y = 25
const width = 1000

export default function Home() {
    const [map, setMap] = useState<MapEnum>(MapEnum.Marcinkowice)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSquare, setSelectedSquare] = useState<SquareProps | null>(null)
    const [height, setHeight] = useState(0)
    const [squares, setSquares] = useState<SquareProps[]>([])
    const imgStankowiceRef = useRef<HTMLImageElement>(null);
    const imgMarcinkowiceRef = useRef<HTMLImageElement>(null);

    const columns = Array.from({length: x}, (_, i) => String.fromCharCode(65 + i)) // A-Z
    const rows = Array.from({length: y}, (_, i) => i + 1) // 1-25

    useLayoutEffect(() => {
        if (map === MapEnum.Marcinkowice && imgMarcinkowiceRef.current) {
            setHeight(imgMarcinkowiceRef.current.height)
            setSquares(createSquares(x, y, width, imgMarcinkowiceRef.current.height))
        }
        if (map === MapEnum.Stanowice && imgStankowiceRef.current) {
            setHeight(imgStankowiceRef.current.height)
            setSquares(createSquares(x, y, width, imgStankowiceRef.current.height))
        }
    }, [map]);

    return (
        <div className="">
            <div className="example flex flex-col items-center mt-2 overflow-scroll space-y-5">
                <div className="flex justify-center mb-4 space-x-2">
                    <Button onClick={() => setMap(MapEnum.Marcinkowice)}>Marcinkowice</Button>
                    <Button onClick={() => setMap(MapEnum.Stanowice)}>Stanowice</Button>
                </div>

                <div className="flex justify-center mb-4 space-x-2">
                    <h1 className="font-bold text-2xl">{map}</h1>
                </div>

                <div className={`flex mb-10`}>
                    <div>
                        {rows.map((column) => (
                            <div
                                key={column}
                                style={{
                                    width: "20px",
                                    height: (height / y).toString() + "px",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <div>{column}</div>
                            </div>
                        ))}
                    </div>

                    <div className={`flex-none relative`}>
                        {map === MapEnum.Marcinkowice &&
                            <img
                                ref={imgMarcinkowiceRef}
                                className="w-[1000px]"
                                src={"marcinkowice.png"} alt="Mapa Marcinkowice"
                            />}
                        {map === MapEnum.Stanowice &&
                            <img
                                ref={imgStankowiceRef}
                                className={"w-[1000px]"}
                                src={"stanowice.png"} alt="Mapa Stanowice"
                            />
                        }
                        {squares.map(square => (
                            <div
                                key={square.id}
                                className={"square"}
                                style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    top: square.top,
                                    left: square.left,
                                    width: square.width,
                                    height: square.height,
                                    outline: square.border,
                                }}
                                onClick={() => {
                                    setIsModalOpen(true)
                                    setSelectedSquare(square)
                                }}
                            />
                        ))}
                        {columns.map((column, index) => (
                            <div
                                key={column}
                                style={{
                                    width: (width / y).toString() + "px",
                                    position: "absolute",
                                    top: "-20px",
                                    left: ((width / y) * index).toString() + "px",
                                    textAlign: "center",
                                }}
                            >
                                <div>{column}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <ExportCSV fileName={"export.csv"}/>
            </div>

            <ModalComponent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedSquare={selectedSquare}
                map={map}
            />
        </div>
    )
}
