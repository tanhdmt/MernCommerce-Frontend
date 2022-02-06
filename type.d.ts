declare namespace projectType {
    interface Cart {
        id: any;
        quantity: number;
        size: string;
        color: string;
        categoryId?: any;
        inStock: string | number;
        name: string;
        image: string;
        price: number;
    }

    interface CartState {
        numberCart: number;
        carts: Cart[];
    }

    interface Category {
        _id: any;
        name: string;
        image: string;
        parentCate: string;
        type: string;
        status?: string;
        deleted?: boolean;
        slug: string;
    }

    interface CategoryState {
        categories: {
            Categories: Category[];
            deletedCount: number;
        };
        category: string;
    }

    interface User {
        _id: any;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        sex: number;
        role: number;
        address: string;
        password: string;
    }

    interface UserState {
        users: User[];
        user?: string;
        isAdmin: number;
        message?: string;
        message_login_fail?: string;
    }

    interface Image {
        _id: string;
        title: string;
        image: string;
        categoryId?: string;
        content?: string;
        promotion?: string;
        position: string;
        status?: string;
    }

    interface ImageState {
        images: {
            Images: Image[];
            deletedCount: number;
        };
        image?: string;
    }

    interface Product {
        _id: any;
        name: string;
        slug?: string;
        image: string;
        categoryId: string;
        color: string;
        type?: string;
        size: string;
        details: string;
        price: number;
        priceDiscount: number;
        quantity: number;
        status?: string;
        save: any;
        deleted: boolean;
    }

    interface ProductState {
        products_list: {
            Products: Product[];
            deletedCount: number;
        };
        colors_list: {
            Colors: Color[];
            deletedCount: number;
        };
        sizes_list: {
            Sizes: Size[];
            deletedCount: number;
        };
        product: Product;
        color: string;
        size: string;
    }

    interface Size {
        _id: any;
        name: string;
        slug?: string;
        save: any;
        deleted: boolean;
    }

    interface Page {
        id: any;
        title: string;
        slug?: string;
        content: string;
        createdBy?: string;
        updatedBy?: string;
        status?: string;
        save: any;
    }

    interface PageState {
        pages_list: Page[];
        page: "";
    }

    interface OrderItem {
        name: string;
        quantity: number;
        inStock: number;
        size: string;
        color: string;
        image: string;
        price: number;
        id: any;
    }
    interface ShippingAddress {
        firstName: string;
        lastName: string;
        address: string;
        emailAddress: string;
        phone: string;
        note?: string;
    }
    interface PaymentResult {
        id: string;
        status?: string;
        update_time?: string;
        email?: string;
    }
    interface Order {
        id: any;
        orderItems: OrderItem;
        shippingAddress: ShippingAddress;
        paymentMethod: string;
        paymentResult?: PaymentResult;
        shippingFee: number;
        totalPrice: number;
        user: any;
        isPaid?: boolean;
        paidAt?: number;
        delivered?: string;
        deliveredAt?: number;
        status?: string;
        save: any;
    }

    interface OrderState {
        loading?: boolean;
        success?: boolean;
        orders: Order[];
        order?: Order[] | string[];
        error?: string[];
    }

    interface Color {
        _id: any;
        name: string;
        code: string;
        slug: string;
        deleted: boolean;
    }

    interface RootState {
        category: CategoryState;
        cart: CartState;
        image: ImageState;
        order: OrderState;
        page: PageState;
        product: ProductState;
        user: UserState;
    }
}
export = projectType;
