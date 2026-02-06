import { PiMagnifyingGlass, PiFunnel } from "react-icons/pi";
import { cn } from "@/lib/utils";

interface TransactionsFiltersProps {
    searchTerm: string;
    onSearchChange: (val: string) => void;
    filterType: 'ALL' | 'IN' | 'OUT';
    onFilterChange: (val: 'ALL' | 'IN' | 'OUT') => void;
}

export function TransactionsFilters({
    searchTerm,
    onSearchChange,
    filterType,
    onFilterChange
}: TransactionsFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
                <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Buscar por descrição ou categoria..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background transition-shadow"
                />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="flex p-1 bg-muted rounded-lg w-full md:w-auto">
                    {(['ALL', 'IN', 'OUT'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => onFilterChange(type)}
                            className={cn(
                                "px-4 py-1.5 text-sm font-medium rounded-md transition-all flex-1 md:flex-none",
                                filterType === type
                                    ? "bg-background shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {type === 'ALL' ? 'Todas' : type === 'IN' ? 'Entradas' : 'Saídas'}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
