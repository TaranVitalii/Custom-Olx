import React from 'react';

export interface childrenProps {
    children?: React.ReactNode;
}

export interface productSummaryProps {
    id: string;
    name: string;
    price: number;
    origin: string;
    createdAt: string;
    updatedAt: string;
    isEditable: boolean;
}

export interface createOrderProps {
    order: orderPiecesProps;
}

export interface orderPiecesProps {
    pieces: createOrderListProps[] | null;
}

export interface createOrderListProps {
    productId: string;
    count: number;
}

export interface updatedProductProps {
    product: updatedOrderWithCountProps;
}

export interface updatedOrderWithCountProps {
    count: number;
    id: string;
    name: string;
    price: number;
    origin: string;
    createdAt: string;
    updatedAt: string;
    isEditable: boolean;
}

export interface orderListProps {
    items: orderProps[];
}

export interface orderProps {
    id: string;
    pieces: [
        {
            product: productSummaryProps;
            count: number;
        },
    ];
    createdAt: string;
}

export interface productsListProps {
    product: productSummaryProps;
    isEditable: boolean;
    showEditModal:
        | ((event: React.MouseEvent<HTMLImageElement, MouseEvent>, product: productSummaryProps) => void)
        | null;
}

export interface pageProps {
    page: number | null;
    origins: string[] | null;
    minPrice: number | null;
    maxPrice: number | null;
    editable: boolean | null;
}

export interface productsOriginsProps {
    displayName: string;
    value: string;
}

export interface productsConfigProps {
    page: number;
    perPage: number;
    totalItems: number;
}

export interface productsPageProps {
    currentPage: number;
    pageCount: number;
}

export interface originsProps {
    name: string;
    value: string;
    checked: boolean;
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface inputPriceProps {
    onBlurHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholderValue: string;
}

export interface MaxMinProps {
    minPriceValue: number | string;
    maxPriceValue: number | string;
    onChangeMaxPriceHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeMinPriceHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PortalProps {
    children?: React.ReactNode;
}

export interface productProps {
    product: {
        name: string;
        price: number;
        origin: string;
    };
    setCreatedStatus: (arg: string | null) => void;
    setIsLoading: (arg: boolean) => void;
}

export interface productPropsRequest {
    product: {
        name: string;
        price: number;
        origin: string;
    };
}

export type productTypes = {
    name: string;
    price: number;
    origin: string;
};
