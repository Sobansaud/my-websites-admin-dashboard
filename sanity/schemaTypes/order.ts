



export default {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
        {
            name: "firstName",
            title: "First Name",
            type: "string",
        },
        {
            name: "lastName",
            title: "Last Name",
            type: "string",
        },
        {
            name: "streetAddress",
            title: "Street Address",
            type: "string",
        },
        {
            name: "zipCode",
            title: "Zip Code",
            type: "string",
        },
        {
            name: "cartItems",
            title: "Cart Items",
            type: "array",
            of: [{ type: "reference", to: { type: "product" } }]
        },
        {
            name: "total",
            title: "Total",
            type: "number",
        },
        {
            name: "status",
            title: "Order Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Shipped", value: "shipped" },
                    { title: "Delivered", value: "delivered" },
                    { title: "Cancelled", value: "cancelled" },
                ],
                layout: "radio"
            },
            initialValue: "pending",
        },
        {
            name: "city",
            title: "City",
            type: "string",
        },
        {
            name: "phoneNumber",
            title: "Phone Number",
            type: "string",
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
      
    ]
};
