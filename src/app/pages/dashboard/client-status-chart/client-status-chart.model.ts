export class ChartDataSetType {
    constructor({ type, label,labelMini, dataset: data }: { type: string, labelMini: string, label: string, dataset?: Chart.ChartDataSets }) {
        this.type = type;
        this.label = label;
        this.labelMini = labelMini;
        this.dataset = { data: [0], ...data };
    }
    labelMini: string;
    type: string;
    label: string
    dataset: Chart.ChartDataSets;
}