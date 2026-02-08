import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OperationFormValues, operationSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { PiCheckCircle, PiSpinner, PiArrowRight } from "react-icons/pi";
import { RWAPortfolioItem } from "@/types";
import { transactionService } from "@/services/transactionService";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewOperationFormProps {
    portfolio: RWAPortfolioItem[];
}

export function NewOperationForm({ portfolio }: NewOperationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { t } = useLanguage();

    const form = useForm<OperationFormValues>({
        resolver: zodResolver(operationSchema) as any,
        defaultValues: {
            type: 'TRANSFER',
            amount: 0,
            description: '',
            recipient: '',
        },
    });

    const { register, handleSubmit, watch, setValue, formState: { errors } } = form; // Added setValue
    const type = watch('type');
    const assetId = watch('assetId'); // Watch asset selection

    // Auto-fill amount when asset is selected
    useEffect(() => {
        if (type === 'INVESTMENT' && assetId) {
            const selectedAsset = portfolio.find(p => p.id === assetId);
            if (selectedAsset) {
                setValue('amount', selectedAsset.price);
            }
        }
    }, [assetId, type, portfolio, setValue]);

    const onSubmit = async (data: OperationFormValues) => {
        setIsSubmitting(true);
        try {
            await transactionService.create({
                amount: data.amount,
                type: 'OUT', // Assuming mostly debits for now, or logic based on type
                description: data.description || (data.type === 'TRANSFER' ? `Transferência para ${data.recipient}` : `Investimento em Ativo`),
                category: data.type === 'TRANSFER' ? t.newOperation.typeTransfer : t.newOperation.typeInvestment,
            });
            setIsSuccess(true);
        } catch (error) {
            console.error("Operation failed", error);
            // Handle error state if needed
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-md mx-auto mt-12 animate-in fade-in zoom-in duration-300">
                <Card className="border-green-100 bg-green-50/50 dark:bg-green-900/10 dark:border-green-900">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PiCheckCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">{t.newOperation.successTitle}</h2>
                        <p className="text-muted-foreground">
                            {t.newOperation.successText}
                        </p>
                        <div className="pt-4 flex flex-col gap-2">
                            <Link href="/transactions" className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-green-700 transition-colors block">
                                {t.newOperation.btnReceipt}
                            </Link>
                            <Link href="/" className="w-full bg-transparent text-primary py-2 rounded-lg font-medium hover:bg-green-50 transition-colors block">
                                {t.newOperation.btnHome}
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Type Selection */}
            <div className="grid grid-cols-2 gap-4">
                <label className={cn(
                    "cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all",
                    type === 'TRANSFER' ? "border-primary bg-green-50/50 text-primary ring-1 ring-primary" : "border-border"
                )}>
                    <input
                        type="radio"
                        value="TRANSFER"
                        className="hidden"
                        {...register('type')}
                    />
                    <span className="font-semibold">{t.newOperation.typeTransfer}</span>
                    <span className="text-xs text-center text-muted-foreground">{t.newOperation.typeTransferDesc}</span>
                </label>

                <label className={cn(
                    "cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all",
                    type === 'INVESTMENT' ? "border-primary bg-green-50/50 text-primary ring-1 ring-primary" : "border-border"
                )}>
                    <input
                        type="radio"
                        value="INVESTMENT"
                        className="hidden"
                        {...register('type')}
                    />
                    <span className="font-semibold">{t.newOperation.typeInvestment}</span>
                    <span className="text-xs text-center text-muted-foreground">{t.newOperation.typeInvestmentDesc}</span>
                </label>
            </div>

            {/* Dynamic Fields */}
            <div className="space-y-4">
                {/* Amount */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">{t.newOperation.labelValue}</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            className={cn(
                                "w-full pl-9 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-lg font-medium",
                                errors.amount ? "border-red-500 focus:ring-red-200" : ""
                            )}
                            {...register('amount')}
                        />
                    </div>
                    {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
                </div>

                {type === 'TRANSFER' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <label className="text-sm font-medium">{t.newOperation.labelRecipient}</label>
                        <input
                            type="text"
                            placeholder={t.newOperation.placeholderRecipient}
                            className={cn(
                                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background",
                                errors.recipient ? "border-red-500 focus:ring-red-200" : ""
                            )}
                            {...register('recipient')}
                        />
                        {errors.recipient && <p className="text-sm text-red-500">{errors.recipient.message}</p>}
                    </div>
                )}

                {type === 'INVESTMENT' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <label className="text-sm font-medium">{t.newOperation.labelAsset}</label>
                        <select
                            className={cn(
                                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background",
                                errors.assetId ? "border-red-500 focus:ring-red-200" : ""
                            )}
                            {...register('assetId')}
                        >
                            <option value="">{t.newOperation.selectAsset}</option>
                            {portfolio.map(asset => (
                                <option key={asset.id} value={asset.id}>
                                    {asset.assetName} ({asset.tokenSymbol}) - Preço: R$ {asset.price}
                                </option>
                            ))}
                        </select>
                        {errors.assetId && <p className="text-sm text-red-500">{errors.assetId.message}</p>}
                    </div>
                )}

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">{t.newOperation.labelDesc}</label>
                    <input
                        type="text"
                        placeholder={t.newOperation.placeholderDesc}
                        className={cn(
                            "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background",
                            errors.description ? "border-red-500 focus:ring-red-200" : ""
                        )}
                        {...register('description')}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <PiSpinner className="w-5 h-5 animate-spin" />
                        {t.newOperation.btnProcessing}
                    </>
                ) : (
                    <>
                        {t.newOperation.btnSubmit}
                        <PiArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>

        </form>
    );
}
