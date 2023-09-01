// export interface SanityProducts {
//     _id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     description: string;
//     productcare: Array<string>;
//     slug: {
//         current: string;
//     };
//     image: Array<Image>;
//     subcat: string;
// }

// interface IProducts {
//     title: string;
//     _id: string;
//     description: string;
//     price: number;
//     image: IImage;
//     tagLine: string;
//     category: {
//         name: string;
//     };
//     slug: {
//         current: string;
//     };

// }
export interface Product {
    _id: string;
    title: string;
    price: number;
    totalPrice: number;//total price of same items selected(price * no of items).
    description: string;
    tagLine: string;
    category: {
        name: string;
    };
    image: Array<Image>;
    userId: string;
    quantity: number;
}

interface SanityProducts {
    title: string;
    _id: string;
    description: string;
    price: number;
    image: Array<Image>;
    tagLine: string;
    userId: string;
    category: {
        name: string;
    };
    slug: {
        current: string;

    }
}