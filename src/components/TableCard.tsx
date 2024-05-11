import { CompleteTableDTO } from "@/api/dtos/table.dto"
import { TableContext, TableMapperMask } from "@/contexts/TableContext";
import { useContext } from "react";
import { FaImage, FaPlus } from "react-icons/fa6";
import Tilt from 'react-parallax-tilt';

export interface TableCardProps {
    completeTable: TableMapperMask;
}

export const TableCard = ({ completeTable }: TableCardProps) => {

    const { table, owner, players, isAddCard } = completeTable;

    const { creatingNewTable, setCreatingNewTable } = useContext(TableContext);

    const onAddClick = () => setCreatingNewTable(true);

    return isAddCard 
        ?
            <div 
                onClick={() => onAddClick()}
                className="h-[33vh] bg-[var(--lead)] hover:bg-[var(--polished-lead)] rounded-md flex flex-col items-center justify-center p-3 transition-all cursor-pointer card-tilt text-[var(--polished-lead)] hover:text-[var(--lead)] hover:shadow-2xl">
                <FaPlus size={96}/>
            </div>
        :
            <Tilt
                tiltReverse
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.04}
                className="h-[33vh] bg-[var(--platinum)] rounded-md flex flex-col items-center justify-start p-3 pb-0 transition-all cursor-pointer card-tilt">
                {/* { table.table.imageUrl ?
                            <div className="max-h-[80%] max-w-[100%] hover:brightness-105 transition rounded-md flex flex-row justify-center items-center shadow-inset">
                            <Image
                            src={table.table.imageUrl}
                            width={500}
                            priority
                            height={500}
                            alt="Table Banner"
                            />
                            </div>
                            :
                            <div className="h-[80%] w-[100%] bg-[var(--darkest-mint)] hover:brightness-105 transition rounded-md flex flex-row justify-center items-center shadow-inset">
                            <FaImage size={96} className="text-[var(--light-mint)]" />
                            </div>
                        } */}
                <div className="h-[80%] w-[100%] bg-[var(--lighter-gray-3)] hover:brightness-105 transition rounded-md flex flex-row justify-center items-center shadow-inset">
                    <FaImage size={96} className="text-[var(--platinum)]" />
                </div>
                <div className="h-[20%] w-[100%] text-[var(--darkest-gray)] flex flex-col justify-center items-center bold uppercase tracking-[0.0125rem] card-sense select-none">
                    {table?.title}
                </div>
            </Tilt>


}