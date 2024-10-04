import React, { PropsWithChildren } from 'react';
import ContentLoader from 'react-content-loader';

export interface LoaderProps {
    loading: boolean;
    columns: number;
    rows: number;
}

const TableLoader: React.FC<PropsWithChildren<LoaderProps>> = ({
    loading = false,
    columns,
    rows,
    children,
}) => {
    const columnGap = 1;
    const rowGap = 5;
    const width = Math.floor(100 / columns) - columnGap;
    const columnOffset = width + columnGap;
    const height = 30; //Math.floor(100 / rows) - rowGap;
    const heightOffset = height + rowGap;

    if (loading) {
        return (
            <ContentLoader
                speed={2}
                width="100%"
                height={heightOffset * rows + rowGap}
                viewBox="0 0 100% 100"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                {[...Array(rows)].map((row, rowIndex) => {
                    return [...Array(columns)].map((column, colIndex) => {
                        return (
                            <rect
                                rx="2"
                                ry="2"
                                key={`loader-${rowIndex}-${colIndex}`}
                                x={`${columnOffset * colIndex}%`}
                                y={rowIndex * heightOffset}
                                width={`${width}%`}
                                height={height}
                            />
                        );
                    });
                })}
            </ContentLoader>
        );
    }

    return <>{children}</>;
};

export default TableLoader;
