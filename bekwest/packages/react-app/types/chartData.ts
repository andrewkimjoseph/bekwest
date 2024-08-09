type ChartData = {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string[];
    }>;
};