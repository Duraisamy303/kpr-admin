import { gql } from '@apollo/client';

export const PRODUCT_LIST = gql`
    query ProductListPaginated($channel: String!, $first: Int!, $after: String, $direction: OrderDirection!, $field: ProductOrderField!) {
        products(first: $first, after: $after, channel: $channel, sortBy: { direction: $direction, field: $field }) {
            totalCount
            edges {
                node {
                    ...ProductListItem
                    tags {
                        name
                        id
                    }
                    __typename
                }
                cursor
                __typename
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                __typename
            }
            __typename
        }
    }

    fragment ProductListItem on Product {
        id
        name
        slug
        metadata {
            key
            value
        }
        pricing {
            priceRange {
                start {
                    gross {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                stop {
                    gross {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                __typename
            }
            discount {
                currency
                __typename
            }
            __typename
        }
        category {
            id
            name
            __typename
        }
        thumbnail(size: 1024, format: WEBP) {
            url
            alt
            __typename
        }
        variants {
            id
            sku
            __typename
        }
        defaultVariant {
            sku
        }
        images {
            url
            __typename
        }
        description
        updatedAt
        channelListings {
            publishedAt
            isPublished
            __typename
        }
        __typename
    }
`;

export const CUSTOMER_ALL_LIST = gql`
    query ListCustomers($after: String, $before: String, $first: Int, $last: Int, $filter: CustomerFilterInput, $sort: UserSortingInput, $PERMISSION_MANAGE_ORDERS: Boolean!) {
        customers(after: $after, before: $before, first: $first, last: $last, filter: $filter, sortBy: $sort) {
            edges {
                node {
                    ...Customer
                    orders @include(if: $PERMISSION_MANAGE_ORDERS) {
                        totalCount
                        __typename
                    }
                    __typename
                }
                __typename
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                __typename
            }
            __typename
        }
    }

    fragment Customer on User {
        id
        email
        firstName
        lastName
        dateJoined
        isActive
        updatedAt
        lastLogin
        __typename
    }
`;

export const DELETE_PRODUCT = gql`
    mutation deleteCategory($id: ID!) {
        categoryDelete(id: $id) {
            errors {
                message
                values
            }
        }
    }
`;

export const SEND_GIFT_CART = gql`
    mutation SendGiftCard($orderid: ID!) {
        sendGiftCard(id: $orderid) {
            errors {
                message
            }
        }
    }
`;

export const CATEGORY_LIST = gql`
    query CategoryList($first: Int!, $after: String, $channel: String!) {
        categories(first: $first, after: $after) {
            edges {
                node {
                    id
                    name
                    description
                    products(channel: $channel) {
                        totalCount
                        __typename
                    }
                    __typename
                    parent {
                        id
                        name
                        __typename
                    }
                    backgroundImage {
                        url
                        alt
                    }
                }
                __typename
            }
            __typename
        }
    }
`;

export const UPDATE_INVOICE_PDF = gql`
    mutation InvoiceRequest($invoiceId: ID!) {
        invoicePdfRegenerate(id: $invoiceId) {
            errors {
                message
            }
            invoice {
                url
            }
        }
    }
`;

export const SEND_PAYLSIP = gql`
    mutation PaySlipSendNotification($orderid: ID!) {
        payslipSendNotification(id: $orderid) {
            errors {
                message
            }
        }
    }
`;

export const CREATE_CATEGORY = gql`
    mutation CategoryCreate($parent: ID, $input: CategoryInput!) {
        categoryCreate(parent: $parent, input: $input) {
            category {
                ...CategoryDetails
                __typename
            }
            errors {
                ...ProductError
                __typename
            }
            __typename
        }
    }

    fragment CategoryDetails on Category {
        id
        ...Metadata
        backgroundImage {
            alt
            url
            __typename
        }
        name
        slug
        description
        seoDescription
        seoTitle
        parent {
            id
            __typename
        }
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment ProductError on ProductError {
        code
        field
        message
        __typename
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation updateCategory($id: ID!, $input: CategoryInput!) {
        categoryUpdate(id: $id, input: $input) {
            category {
                id
                name
                description
                slug
            }
        }
    }
`;

export const CREATE_TAG = gql`
    mutation ProductStyleCreate($input: TagInput!) {
        tagCreate(input: $input) {
            tag {
                id
                name
                slug
            }
        }
    }
`;

export const UPDATE_TAG = gql`
    mutation Tag_Update($id: ID!, $input: TagInput!) {
        tagUpdate(id: $id, input: $input) {
            tag {
                id
                name
                slug
            }
        }
    }
`;

export const DELETE_TAG = gql`
    mutation Tag_Delete($id: ID!) {
        tagDelete(id: $id) {
            errors {
                message
            }
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($id: ID!) {
        categoryDelete(id: $id) {
            errors {
                message
                values
            }
        }
    }
`;

export const FINISH_LIST = gql`
    query GetProductFinished {
        productFinishes(first: 100) {
            edges {
                node {
                    name
                    slug
                    id
                }
            }
            totalCount
        }
    }
`;

export const CREATE_FINISH = gql`
    mutation ProductFinishCreate($input: ProductFinishInput!) {
        productFinishCreate(input: $input) {
            productFinish {
                name
                slug
                id
            }
        }
    }
`;

export const UPDATE_FINISH = gql`
    mutation ProductFinishUpdate($id: ID!, $input: ProductFinishInput!) {
        productFinishUpdate(id: $id, input: $input) {
            productFinish {
                id
                name
                slug
            }
        }
    }
`;

export const DELETE_FINISH = gql`
    mutation ProductFinishDelete($id: ID!) {
        productFinishDelete(id: $id) {
            productFinish {
                id
                name
                slug
            }
        }
    }
`;

export const DESIGN_LIST = gql`
    query MyQuery {
        productDesigns(first: 100) {
            totalCount
            edges {
                node {
                    id
                    name
                    slug
                }
            }
        }
    }
`;

export const CREATE_DESIGN = gql`
    mutation ProductDesignCreate($input: ProductDesignInput!) {
        productDesignCreate(input: $input) {
            productDesign {
                id
                name
                slug
            }
        }
    }
`;

export const UPDATE_DESIGN = gql`
    mutation ProductDesignUpdate($id: ID!, $input: ProductDesignInput!) {
        productDesignUpdate(id: $id, input: $input) {
            productDesign {
                id
                name
                slug
            }
        }
    }
`;

export const DELETE_DESIGN = gql`
    mutation ProductDesignDelete($id: ID!) {
        productDesignDelete(id: $id) {
            ok
            errors {
                values
                message
            }
        }
    }
`;

export const STONE_LIST = gql`
    query MyQuery {
        productStoneTypes(first: 100) {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
        }
    }
`;

export const SIZE_LIST = gql`
    query Size_List {
        sizes(first: 100) {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;

export const CREATE_SIZE = gql`
    mutation Create_Size($input: SizeInput!) {
        sizeCreate(input: $input) {
            size {
                id
                name
                slug
            }
        }
    }
`;

export const UPDATE_SIZE = gql`
    mutation Size_Update($id: ID!, $input: SizeInput!) {
        sizeUpdate(id: $id, input: $input) {
            size {
                id
                name
                slug
            }
        }
    }
`;

export const DELETE_SIZE = gql`
    mutation Size_Delete($id: ID!) {
        sizeDelete(id: $id) {
            errors {
                message
            }
        }
    }
`;

export const TYPE_LIST = gql`
    query Itemtype_List {
        itemTypes(first: 100) {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;

export const CREATE_TYPE = gql`
    mutation Itemtype_Create($input: ItemTypeInput!) {
        itemTypeCreate(input: $input) {
            errors {
                message
            }
            itemType {
                id
                name
            }
        }
    }
`;

export const UPDATE_TYPE = gql`
    mutation ItemtypeUpdate($id: ID!, $input: ItemTypeInput!) {
        itemTypeUpdate(id: $id, input: $input) {
            errors {
                message
            }
            itemType {
                id
                name
            }
        }
    }
`;

export const DELETE_TYPE = gql`
    mutation Item_Type_Delete($id: ID!) {
        itemTypeDelete(id: $id) {
            errors {
                message
            }
        }
    }
`;

export const COLOR_LIST = gql`
    query Stone_Color_List {
        stoneColors(first: 100) {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;

export const CREATE_COLOR = gql`
    mutation Stone_Color_Create($input: StoneColorInput!) {
        stoneColorCreate(input: $input) {
            stoneColor {
                name
                id
                slug
            }
        }
    }
`;

export const UPDATE_COLOR = gql`
    mutation Stone_Color_Update($id: ID!, $input: StoneColorInput!) {
        stoneColorUpdate(id: $id, input: $input) {
            stoneColor {
                id
                name
                slug
            }
        }
    }
`;

export const DELETE_COLOR = gql`
    mutation Stone_Color_Delete($id: ID!) {
        stoneColorDelete(id: $id) {
            errors {
                message
            }
        }
    }
`;

export const CREATE_STONE = gql`
    mutation CreateStoneType($input: ProductStoneTypeInput!) {
        productStoneTypeCreate(input: $input) {
            productStoneType {
                id
                name
                slug
            }
        }
    }
`;

export const UPDATE_STONE = gql`
    mutation UpdateStoneType($id: ID!, $input: ProductStoneTypeInput!) {
        productStoneTypeUpdate(id: $id, input: $input) {
            productStoneType {
                id
                name
                slug
            }
        }
    }
`;

export const DELETE_STONE = gql`
    mutation ProductStoneTypeDelete($id: ID!) {
        productStoneTypeDelete(id: $id) {
            ok
        }
    }
`;

export const STYLE_LIST = gql`
    query GetProductStyles {
        productStyles(first: 100) {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
            totalCount
        }
    }
`;

export const CREATE_STYLE = gql`
    mutation ProductStyleCreate($input: ProductStyleInput!) {
        productStyleCreate(input: $input) {
            productStyle {
                id
                name
                slug
            }
        }
    }
`;

export const UPDATE_STYLE = gql`
    mutation ProductStyleUpdate($id: ID!, $input: ProductStyleInput!) {
        productStyleUpdate(id: $id, input: $input) {
            productStyle {
                id
                name
                slug
            }
        }
    }
`;

export const DELETE_STYLE = gql`
    mutation ProductStyleDelete($id: ID!) {
        productStyleDelete(id: $id) {
            errors {
                message
            }
        }
    }
`;

export const ORDER_LIST = gql`
    query OrderList($first: Int, $after: String, $last: Int, $before: String, $filter: OrderFilterInput, $sort: OrderSortingInput) {
        orders(before: $before, after: $after, first: $first, last: $last, filter: $filter, sortBy: $sort) {
            edges {
                node {
                    __typename
                    billingAddress {
                        ...Address
                        __typename
                    }
                    created
                    id
                    number
                    paymentStatus
                    status
                    total {
                        __typename
                        gross {
                            __typename
                            amount
                            currency
                        }
                    }
                    userEmail
                    invoices {
                        number
                        url
                        id
                    }
                    courierPartner {
                        name
                        trackingUrl
                        id
                    }
                    fulfillments {
                        id
                        trackingNumber
                    }
                }
                __typename
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
                __typename
            }
            __typename
        }
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }
`;

export const SHIPPING_LIST = gql`
    query GetShippingCarrier {
        shippingCarriers(first: 100) {
            edges {
                node {
                    id
                    name
                    trackingUrl
                }
            }
        }
    }
`;

export const CREATE_INVOICE = gql`
    mutation InvoiceRequest($orderId: ID!) {
        invoiceRequest(orderId: $orderId) {
            errors {
                ...InvoiceError
                __typename
            }
            invoice {
                ...Invoice
                __typename
            }
            order {
                id
                invoices {
                    ...Invoice
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment InvoiceError on InvoiceError {
        code
        field
        message
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const UPDATE_INVOICE = gql`
    mutation InvoiceUpdate($invoiceid: ID!, $input: UpdateInvoiceInput!) {
        invoiceUpdate(id: $invoiceid, input: $input) {
            errors {
                message
            }
            invoice {
                createdAt
            }
        }
    }
`;

export const UPDATE_PAYSLIP = gql`
    mutation OrderUpdateMetadata($id: ID!, $input: [MetadataInput!]!, $keysToDelete: [String!]!) {
        updateMetadata(id: $id, input: $input) {
            errors {
                ...MetadataError
                __typename
            }
            item {
                ...Metadata
                ... on Node {
                    id
                    __typename
                }
                __typename
            }
            __typename
        }
        deleteMetadata(id: $id, keys: $keysToDelete) {
            errors {
                ...MetadataError
                __typename
            }
            item {
                ...Metadata
                ... on Node {
                    id
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment MetadataError on MetadataError {
        code
        field
        message
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }
`;

export const ORDER_FULFILL_SETTING = gql`
    query OrderFulfillSettings {
        shop {
            ...ShopOrderSettings
            __typename
        }
    }

    fragment ShopOrderSettings on Shop {
        fulfillmentAutoApprove
        fulfillmentAllowUnpaid
        __typename
    }
`;

export const CREATE_PAYSLIP = gql`
    mutation InvoiceRequest($orderId: ID!) {
        payslipRequest(orderId: $orderId) {
            errors {
                ...PayslipError
                __typename
            }

            order {
                id
                metadata {
                    key
                    value
                }

                __typename
            }
            __typename
        }
    }

    fragment PayslipError on InvoiceError {
        code
        field
        message
        __typename
    }
`;

export const ORDER_FULFILL_DATA = gql`
    query OrderFulfillData($orderId: ID!) {
        order(id: $orderId) {
            id
            isPaid
            deliveryMethod {
                __typename
                ... on ShippingMethod {
                    id
                    __typename
                }
                ... on Warehouse {
                    id
                    clickAndCollectOption
                    __typename
                }
            }
            lines {
                ...OrderFulfillLine
                __typename
            }
            number
            __typename
        }
    }

    fragment OrderFulfillLine on OrderLine {
        id
        isShippingRequired
        productName
        quantity
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        quantityFulfilled
        quantityToFulfill
        variant {
            id
            name
            sku
            preorder {
                endDate
                __typename
            }
            attributes {
                values {
                    id
                    name
                    __typename
                }
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            trackInventory
            __typename
        }
        thumbnail(size: 64) {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }
`;

export const UPDATE_SHIPPING_PROVIDER = gql`
    mutation OrderUpdate($input: OrderUpdateInput!, $orderId: ID!) {
        orderUpdate(input: $input, id: $orderId) {
            order {
                id
                number
                courierPartner {
                    name
                    id
                    trackingUrl
                }
            }
            errors {
                message
            }
        }
    }
`;

export const DRAFT_ORDER_CANCEL = gql`
    mutation OrderCancel($id: ID!) {
        orderCancel(id: $id) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const UPDATE_TRACKING_NUMBER = gql`
    mutation OrderFulfillmentUpdateTracking($id: ID!, $input: FulfillmentUpdateTrackingInput!) {
        orderFulfillmentUpdateTracking(id: $id, input: $input) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const CUSTOMER_LIST = gql`
    query SearchCustomers($after: String, $first: Int!, $query: String!) {
        search: customers(after: $after, first: $first, filter: { search: $query }) {
            edges {
                node {
                    id
                    email
                    firstName
                    lastName
                    __typename
                }
                __typename
            }
            pageInfo {
                ...PageInfo
                __typename
            }
            __typename
        }
    }

    fragment PageInfo on PageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        __typename
    }
`;

export const CREATE_SHIPPING = gql`
    mutation Shipping_CarrierCreate($input: Shipping_CarrierInput!) {
        shippingCarrierCreate(input: $input) {
            shippingCarrier {
                id
                name
                trackingUrl
            }
            errors {
                message
            }
        }
    }
`;

export const UPDATE_SHIPPING_COST = gql`
    mutation OrderShippingMethodUpdate($id: ID!, $input: OrderUpdateShippingInput!) {
        orderUpdateShipping(order: $id, input: $input) {
            errors {
                ...OrderError
                __typename
            }
            order {
                shippingMethods {
                    id
                    name
                    __typename
                }
                total {
                    tax {
                        amount
                        currency
                        __typename
                    }
                    gross {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                id
                shippingMethod {
                    id
                    name
                    price {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                shippingMethodName
                shippingPrice {
                    gross {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const UPDATE_SHIPPING = gql`
    mutation Shipping_CarrierUpdate($id: ID!, $input: Shipping_CarrierInput!) {
        shippingCarrierUpdate(id: $id, input: $input) {
            shippingCarrier {
                id
                name
                trackingUrl
            }
        }
    }
`;

export const DELETE_SHIPPING = gql`
    mutation Shipping_CarrierDelete($id: ID!) {
        shippingCarrierDelete(id: $id) {
            errors {
                message
            }
        }
    }
`;

export const REMOVE_DISCOUNT = gql`
    mutation OrderDiscountDelete($discountId: ID!) {
        orderDiscountDelete(discountId: $discountId) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const FULLFILL_ORDERS = gql`
    mutation FulfillOrder($orderId: ID!, $input: OrderFulfillInput!) {
        orderFulfill(order: $orderId, input: $input) {
            errors {
                ...OrderError
                warehouse
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const MARK_US_PAID = gql`
    mutation OrderMarkAsPaid($id: ID!, $transactionReference: String) {
        orderMarkAsPaid(id: $id, transactionReference: $transactionReference) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const UPDATE_COUPEN = gql`
    mutation OrderDiscountUpdate($input: OrderDiscountCommonInput!, $discountId: ID!) {
        orderDiscountUpdate(input: $input, discountId: $discountId) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const ADD_COUPEN = gql`
    mutation OrderDiscountAdd($input: OrderDiscountCommonInput!, $orderId: ID!) {
        orderDiscountAdd(input: $input, orderId: $orderId) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const GET_ORDER_DETAILS = gql`
    query OrderDetailsWithMetadata($id: ID!, $isStaffUser: Boolean!) {
        order(id: $id) {
            metadata {
                key
                value
                __typename
            }
            giftCardsPurchased {
                code
                id
                createdByEmail
                lastUsedOn
                usedByEmail
                expiryDate
                currentBalance {
                    amount
                    currency
                }
            }
            ...OrderDetailsWithMetadata
            __typename
            courierPartner {
                id
                name
                trackingUrl
                __typename
            }
            paymentMethod {
                name
                id
                __typename
            }
        }
        shop {
            countries {
                code
                country
                __typename
            }
            defaultWeightUnit
            fulfillmentAllowUnpaid
            fulfillmentAutoApprove
            availablePaymentGateways {
                ...PaymentGateway
                __typename
            }
            __typename
        }
    }

    fragment OrderDetailsWithMetadata on Order {
        ...OrderDetails
        fulfillments {
            ...FulfillmentWithMetadata
            __typename
        }
        lines {
            ...OrderLineWithMetadata
            __typename
        }
        __typename
        isGiftWrap
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        tax {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }

    fragment FulfillmentWithMetadata on Fulfillment {
        ...Fulfillment
        lines {
            orderLine {
                ...OrderLineWithMetadata
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderLineWithMetadata on OrderLine {
        ...OrderLine
        variant {
            metadata {
                ...MetadataItem
                __typename
            }
            privateMetadata @include(if: $isStaffUser) {
                ...MetadataItem
                __typename
            }
            __typename
            product {
                category {
                    name
                }
            }
        }
        __typename
    }

    fragment PaymentGateway on PaymentGateway {
        name
        id
        __typename
    }
`;

export const CREATE_NOTES = gql`
    mutation OrderNoteAdd($input: OrderNoteInput!, $orderId: ID!, $private_note: Boolean!) {
        orderNoteAdd(input: $input, order: $orderId, private_note: $private_note) {
            order {
                id
                number
                user {
                    email
                    firstName
                    lastName
                }
                events {
                    id
                    message
                    type
                    date
                    user {
                        firstName
                        lastName
                        email
                    }
                }
            }
        }
    }
`;

export const UNFULFILLMENT_ORDER = gql`
    mutation OrderFulfillmentCancel($id: ID!, $input: FulfillmentCancelInput!) {
        orderFulfillmentCancel(id: $id, input: $input) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const UPDATE_NOTES = gql`
    mutation Shipping_CarrierUpdate($id: ID!, $input: Shipping_CarrierInput!) {
        shippingCarrierUpdate(id: $id, input: $input) {
            shippingCarrier {
                id
                name
                trackingUrl
            }
        }
    }
`;

export const DELETE_NOTES = gql`
    mutation OrderNoteDelete($noteId: ID!) {
        orderNoteDelete(id: $noteId) {
            errors {
                message
            }
        }
    }
`;

export const STATE_LIST = gql`
    query CountryArea($code: CountryCode!) {
        addressValidationRules(countryCode: $code) {
            countryAreaChoices {
                raw
                verbose
            }
        }
    }
`;

export const UPDATE_SHIPPING_COUNTRY = gql`
    mutation checkoutShippingAddressUpdate($checkoutId: ID!, $shippingAddress: AddressInput!, $validationRules: CheckoutAddressValidationRules) {
        checkoutShippingAddressUpdate(id: $checkoutId, shippingAddress: $shippingAddress, validationRules: $validationRules) {
            errors {
                ...CheckoutErrorFragment
                __typename
            }

            __typename
        }
    }
    fragment CheckoutErrorFragment on CheckoutError {
        message
        field
        code
        __typename
    }
`;

export const COUNTRY_LIST = gql`
    query CountryList {
        shop {
            countries {
                code
                country
            }
        }
    }
`;

export const ADD_CUSTOMER = gql`
    mutation CreateCustomer($input: UserCreateInput!) {
        customerCreate(input: $input) {
            errors {
                ...AccountError
                __typename
            }
            user {
                id
                __typename
            }
            __typename
        }
    }

    fragment AccountError on AccountError {
        code
        field
        addressType
        message
        __typename
    }
`;

export const RESET_PASSWORD = gql`
    mutation Password_Reset($email: String!) {
        passwordReset(email: $email) {
            success
            message
        }
    }
`;

export const UPDATE_CUSTOMER = gql`
    mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
        customerUpdate(id: $id, input: $input) {
            errors {
                ...AccountError
                __typename
            }
            user {
                ...CustomerDetails
                __typename
            }
            __typename
        }
    }

    fragment AccountError on AccountError {
        code
        field
        addressType
        message
        __typename
    }

    fragment CustomerDetails on User {
        ...Customer
        ...Metadata
        dateJoined
        lastLogin
        defaultShippingAddress {
            ...Address
            __typename
        }
        defaultBillingAddress {
            ...Address
            __typename
        }
        note
        isActive
        __typename
    }

    fragment Customer on User {
        id
        email
        firstName
        lastName
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }
`;

export const CUSTOMER_DETAILS = gql`
    query CustomerDetails($id: ID!, $PERMISSION_MANAGE_ORDERS: Boolean!) {
        user(id: $id) {
            ...CustomerDetails
            orders(last: 5) @include(if: $PERMISSION_MANAGE_ORDERS) {
                edges {
                    node {
                        id
                        created
                        number
                        paymentStatus
                        total {
                            gross {
                                currency
                                amount
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                    __typename
                }
                __typename
            }
            lastPlacedOrder: orders(last: 1) @include(if: $PERMISSION_MANAGE_ORDERS) {
                edges {
                    node {
                        id
                        created
                        __typename
                    }
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment CustomerDetails on User {
        ...Customer
        ...Metadata
        dateJoined
        lastLogin
        defaultShippingAddress {
            ...Address
            __typename
        }
        defaultBillingAddress {
            ...Address
            __typename
        }
        note
        isActive
        __typename
    }

    fragment Customer on User {
        id
        email
        firstName
        lastName
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }
`;

export const STATES_LIST = gql`
    query CountryArea($code: CountryCode!) {
        addressValidationRules(countryCode: $code) {
            countryAreaChoices {
                raw
                verbose
            }
        }
    }
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
    mutation UpdateCustomerAddress($id: ID!, $input: AddressInput!) {
        addressUpdate(id: $id, input: $input) {
            errors {
                ...AccountError
                __typename
            }
            address {
                ...Address
                __typename
            }
            __typename
        }
    }

    fragment AccountError on AccountError {
        code
        field
        addressType
        message
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }
`;

export const FINALIZE_ORDER = gql`
    mutation OrderDraftFinalize($id: ID!) {
        draftOrderComplete(id: $id) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const CHANNEL_LIST = gql`
    query BaseChannels {
        channels {
            ...Channel
            __typename
        }
    }

    fragment Channel on Channel {
        id
        isActive
        name
        slug
        currencyCode
        defaultCountry {
            code
            country
            __typename
        }
        stockSettings {
            allocationStrategy
            __typename
        }
        __typename
    }
`;

export const PRODUCT_CAT_LIST = gql`
    query SearchCategories($after: String, $first: Int!, $query: String!) {
        search: categories(after: $after, first: $first, filter: { search: $query }) {
            edges {
                node {
                    id
                    name
                    __typename
                }
                __typename
            }
            pageInfo {
                ...PageInfo
                __typename
            }
            __typename
        }
    }

    fragment PageInfo on PageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        __typename
    }
`;

export const COLLECTION_LIST = gql`
    query SearchCollections($after: String, $first: Int!, $query: String!, $channel: String) {
        search: collections(after: $after, first: $first, filter: { search: $query }, channel: $channel) {
            edges {
                node {
                    id
                    name
                    __typename
                }
                __typename
            }
            pageInfo {
                ...PageInfo
                __typename
            }
            __typename
        }
    }

    fragment PageInfo on PageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        __typename
    }
`;

export const PRODUCT_TYPE_LIST = gql`
    query SearchProductTypes($after: String, $first: Int!, $query: String!) {
        search: productTypes(after: $after, first: $first, filter: { search: $query }) {
            edges {
                node {
                    id
                    name
                    __typename
                }
                __typename
            }
            pageInfo {
                ...PageInfo
                __typename
            }
            __typename
        }
    }

    fragment PageInfo on PageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        __typename
    }
`;

export const CREATE_PRODUCT = gql`
    mutation ProductCreate($input: ProductCreateInput!) {
        productCreate(input: $input) {
            errors {
                ...ProductErrorWithAttributes
                __typename
            }
            product {
                id
                __typename
            }
            __typename
        }
    }

    fragment ProductErrorWithAttributes on ProductError {
        ...ProductError
        attributes
        __typename
    }

    fragment ProductError on ProductError {
        code
        field
        message
        __typename
    }
`;

export const UPDATE_PRODUCT_CHANNEL = gql`
    mutation ProductChannelListingUpdate($id: ID!, $input: ProductChannelListingUpdateInput!) {
        productChannelListingUpdate(id: $id, input: $input) {
            errors {
                ...ProductChannelListingError
                __typename
            }
            __typename
        }
    }

    fragment ProductChannelListingError on ProductChannelListingError {
        code
        field
        message
        channels
        __typename
    }
`;

export const CREATE_VARIANT = gql`
    mutation ProductVariantBulkCreate($id: ID!, $inputs: [ProductVariantBulkCreateInput!]!) {
        productVariantBulkCreate(product: $id, variants: $inputs) {
            errors {
                ...BulkProductError
                __typename
            }
            productVariants {
                id
                __typename
            }
            __typename
        }
    }

    fragment BulkProductError on BulkProductError {
        field
        code
        index
        channels
        message
        __typename
    }
`;

export const UPDATE_VARIANT = gql`
    mutation ProductVariantBulkUpdate($product: ID!, $input: [ProductVariantBulkUpdateInput!]!, $errorPolicy: ErrorPolicyEnum) {
        productVariantBulkUpdate(errorPolicy: $errorPolicy, product: $product, variants: $input) {
            errors {
                ...ProductVariantBulkError
                __typename
            }
            results {
                errors {
                    ...ProductVariantBulkError
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment ProductVariantBulkError on ProductVariantBulkError {
        field
        code
        message
        attributes
        values
        warehouses
        channels
        __typename
    }
`;

export const UPDATE_META_DATA = gql`
    mutation UpdateMetadata($id: ID!, $input: [MetadataInput!]!, $keysToDelete: [String!]!) {
        updateMetadata(id: $id, input: $input) {
            errors {
                ...MetadataError
                __typename
            }
            item {
                ...Metadata
                ... on Node {
                    id
                    __typename
                }
                __typename
            }
            __typename
        }
        deleteMetadata(id: $id, keys: $keysToDelete) {
            errors {
                ...MetadataError
                __typename
            }
            item {
                ...Metadata
                ... on Node {
                    id
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment MetadataError on MetadataError {
        code
        field
        message
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }
`;

export const UPDATE_VARIANT_LIST = gql`
    mutation ProductVariantChannelListingUpdate($id: ID!, $input: [ProductVariantChannelListingAddInput!]!) {
        productVariantChannelListingUpdate(id: $id, input: $input) {
            variant {
                id
                channelListings {
                    ...ChannelListingProductVariant
                    __typename
                }
                product {
                    id
                    channelListings {
                        ...ChannelListingProductWithoutPricing
                        __typename
                    }
                    __typename
                }
                __typename
            }
            errors {
                ...ProductChannelListingError
                __typename
            }
            __typename
        }
    }

    fragment ChannelListingProductVariant on ProductVariantChannelListing {
        id
        channel {
            id
            name
            currencyCode
            __typename
        }
        price {
            ...Money
            __typename
        }
        costPrice {
            ...Money
            __typename
        }
        preorderThreshold {
            quantity
            soldUnits
            __typename
        }
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment ChannelListingProductWithoutPricing on ProductChannelListing {
        isPublished
        publicationDate
        isAvailableForPurchase
        availableForPurchase
        visibleInListings
        channel {
            id
            name
            currencyCode
            __typename
        }
        __typename
    }

    fragment ProductChannelListingError on ProductChannelListingError {
        code
        field
        message
        channels
        __typename
    }
`;

export const PRODUCT_MEDIA_CREATE = gql`
    mutation ProductMediaCreate($product: ID!, $image: Upload, $alt: String, $mediaUrl: String) {
        productMediaCreate(input: { product: $product, image: $image, alt: $alt, mediaUrl: $mediaUrl }) {
            errors {
                ...ProductError
                __typename
            }
            product {
                id
                media {
                    ...ProductMedia
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment ProductError on ProductError {
        code
        field
        message
        __typename
    }

    fragment ProductMedia on ProductMedia {
        id
        alt
        sortOrder
        url(size: 1024)
        type
        oembedData
        __typename
    }
`;

export const PRODUCT_FULL_DETAILS = gql`
    query ProductDetails($id: ID!, $channel: String, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
        product(id: $id, channel: $channel) {
            metadata {
                key
                value
                __typename
            }
            ...Product
            __typename
            productFinish {
                id
                name
                __typename
            }
            productStoneType {
                id
                name
                __typename
            }
            productstyle {
                id
                name
                __typename
            }
            prouctDesign {
                id
                name
                __typename
            }
            productStonecolor {
                id
                name
            }
            productSize {
                id
                name
            }
            productItemtype {
                id
                name
            }
        }
    }

    fragment Product on Product {
        ...ProductVariantAttributes
        name
        slug
        description
        seoTitle
        seoDescription
        rating
        defaultVariant {
            id
            __typename
        }
        category {
            id
            name
            __typename
        }
        collections {
            id
            name
            __typename
        }
        channelListings {
            ...ChannelListingProductWithoutPricing
            __typename
        }
        media {
            ...ProductMedia
            __typename
        }
        isAvailable
        variants {
            ...ProductDetailsVariant
            __typename
        }
        productType {
            id
            name
            hasVariants
            __typename
        }
        weight {
            ...Weight
            __typename
        }
        taxClass {
            id
            name
            __typename
        }
        __typename
        productFinish {
            id
            name
            __typename
        }
        productStoneType {
            id
            name
            __typename
        }
        productstyle {
            id
            name
            __typename
        }
        prouctDesign {
            id
            name
            __typename
        }
        productStonecolor {
            id
            name
            __typename
        }
        productSize {
            id
            name
            __typename
        }
        productItemtype {
            id
            name
            __typename
        }
        orderNo
        tags {
            id
            name
            __typename
        }
    }

    fragment ProductVariantAttributes on Product {
        id
        attributes {
            attribute {
                id
                slug
                name
                inputType
                entityType
                valueRequired
                unit

                __typename
            }
            values {
                ...AttributeValueDetails
                __typename
            }
            __typename
        }
        productType {
            id
            variantAttributes {
                ...VariantAttribute
                __typename
            }
            __typename
        }
        channelListings {
            channel {
                id
                name
                currencyCode
                __typename
            }
            __typename
        }
        __typename
        thumbnail {
            url
            alt
            __typename
        }
    }

    fragment AttributeValueList on AttributeValueCountableConnection {
        pageInfo {
            ...PageInfo
            __typename
        }
        edges {
            cursor
            node {
                ...AttributeValueDetails
                __typename
            }
            __typename
        }
        __typename
    }

    fragment PageInfo on PageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        __typename
    }

    fragment AttributeValueDetails on AttributeValue {
        ...AttributeValue
        plainText
        richText
        __typename
    }

    fragment AttributeValue on AttributeValue {
        id
        name
        slug
        file {
            ...File
            __typename
        }
        reference
        boolean
        date
        dateTime
        value
        __typename
    }

    fragment File on File {
        url
        contentType
        __typename
    }

    fragment VariantAttribute on Attribute {
        id
        name
        slug
        inputType
        entityType
        valueRequired
        unit
        choices(first: $firstValues, after: $afterValues, last: $lastValues, before: $beforeValues) {
            ...AttributeValueList
            __typename
        }
        __typename
    }

    fragment ChannelListingProductWithoutPricing on ProductChannelListing {
        isPublished
        publicationDate
        isAvailableForPurchase
        availableForPurchase
        visibleInListings
        channel {
            id
            name
            currencyCode
            __typename
        }
        __typename
    }

    fragment ProductMedia on ProductMedia {
        id
        alt
        sortOrder
        url(size: 1024)
        type
        oembedData
        __typename
    }

    fragment ProductDetailsVariant on ProductVariant {
        id
        sku
        name
        attributes {
            attribute {
                id
                name
                __typename
            }
            values {
                ...AttributeValueDetails
                __typename
            }
            __typename
        }
        media {
            url(size: 200)
            __typename
        }
        stocks {
            ...Stock
            __typename
        }
        trackInventory
        preorder {
            ...Preorder
            __typename
        }
        channelListings {
            ...ChannelListingProductVariant
            __typename
        }
        quantityLimitPerCustomer
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment Preorder on PreorderData {
        globalThreshold
        globalSoldUnits
        endDate
        __typename
    }

    fragment ChannelListingProductVariant on ProductVariantChannelListing {
        id
        channel {
            id
            name
            currencyCode
            __typename
        }
        price {
            ...Money
            __typename
        }
        costPrice {
            ...Money
            __typename
        }
        preorderThreshold {
            quantity
            soldUnits
            __typename
        }
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment Weight on Weight {
        unit
        value
        __typename
    }
`;

export const PRODUCT_DETAILS = gql`
    query ProductDetails($id: ID!, $channel: String, $firstValues: Int, $afterValues: String, $lastValues: Int, $beforeValues: String) {
        product(id: $id, channel: $channel) {
            ...Product
            __typename
        }
    }

    fragment Product on Product {
        ...ProductVariantAttributes
        ...Metadata
        name
        slug
        description
        seoTitle
        seoDescription
        rating
        defaultVariant {
            id
            __typename
        }
        category {
            id
            name
            __typename
        }
        collections {
            id
            name
            __typename
        }
        channelListings {
            ...ChannelListingProductWithoutPricing
            __typename
        }
        media {
            ...ProductMedia
            __typename
        }
        isAvailable
        variants {
            ...ProductDetailsVariant
            __typename
        }
        productType {
            id
            name
            hasVariants
            __typename
        }
        weight {
            ...Weight
            __typename
        }
        taxClass {
            id
            name
            __typename
        }
        __typename
        productFinish {
            id
            name
        }
        productStoneType {
            id
            name
        }
        productstyle {
            id
            name
        }
        prouctDesign {
            id
            name
        }
        orderNo
        tags {
            id
            name
        }
    }

    fragment ProductVariantAttributes on Product {
        id
        attributes {
            attribute {
                id
                slug
                name
                inputType
                entityType
                valueRequired
                unit
                choices(first: $firstValues, after: $afterValues, last: $lastValues, before: $beforeValues) {
                    ...AttributeValueList
                    __typename
                }
                __typename
            }
            values {
                ...AttributeValueDetails
                __typename
            }
            __typename
        }
        productType {
            id
            variantAttributes {
                ...VariantAttribute
                __typename
            }
            __typename
        }
        channelListings {
            channel {
                id
                name
                currencyCode
                __typename
            }
            __typename
        }
        __typename
        thumbnail {
            url
            alt
        }
    }

    fragment AttributeValueList on AttributeValueCountableConnection {
        pageInfo {
            ...PageInfo
            __typename
        }
        edges {
            cursor
            node {
                ...AttributeValueDetails
                __typename
            }
            __typename
        }
        __typename
    }

    fragment PageInfo on PageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        __typename
    }

    fragment AttributeValueDetails on AttributeValue {
        ...AttributeValue
        plainText
        richText
        __typename
    }

    fragment AttributeValue on AttributeValue {
        id
        name
        slug
        file {
            ...File
            __typename
        }
        reference
        boolean
        date
        dateTime
        value
        __typename
    }

    fragment File on File {
        url
        contentType
        __typename
    }

    fragment VariantAttribute on Attribute {
        id
        name
        slug
        inputType
        entityType
        valueRequired
        unit
        choices(first: $firstValues, after: $afterValues, last: $lastValues, before: $beforeValues) {
            ...AttributeValueList
            __typename
        }
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment ChannelListingProductWithoutPricing on ProductChannelListing {
        isPublished
        publicationDate
        isAvailableForPurchase
        availableForPurchase
        visibleInListings
        channel {
            id
            name
            currencyCode
            __typename
        }
        __typename
    }

    fragment ProductMedia on ProductMedia {
        id
        alt
        sortOrder
        url(size: 1024)
        type
        oembedData
        __typename
    }

    fragment ProductDetailsVariant on ProductVariant {
        id
        sku
        name
        attributes {
            attribute {
                id
                name
                __typename
            }
            values {
                ...AttributeValueDetails
                __typename
            }
            __typename
        }
        media {
            url(size: 200)
            __typename
        }
        stocks {
            ...Stock
            __typename
        }
        trackInventory
        preorder {
            ...Preorder
            __typename
        }
        channelListings {
            ...ChannelListingProductVariant
            __typename
        }
        quantityLimitPerCustomer
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment Preorder on PreorderData {
        globalThreshold
        globalSoldUnits
        endDate
        __typename
    }

    fragment ChannelListingProductVariant on ProductVariantChannelListing {
        id
        channel {
            id
            name
            currencyCode
            __typename
        }
        price {
            ...Money
            __typename
        }
        costPrice {
            ...Money
            __typename
        }
        preorderThreshold {
            quantity
            soldUnits
            __typename
        }
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment Weight on Weight {
        unit
        value
        __typename
    }
`;

export const PRODUCT_LIST_TAGS = gql`
    query TagList {
        tags(first: 100) {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;

export const CUSTOMER_UPDATE_ADDRESS = gql`
    mutation UpdateCustomerAddress($id: ID!, $input: AddressInput!) {
        addressUpdate(id: $id, input: $input) {
            errors {
                ...AccountError
                __typename
            }
            address {
                ...Address
                __typename
            }
            __typename
        }
    }

    fragment AccountError on AccountError {
        code
        field
        addressType
        message
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }
`;

export const SEND_INVOICE = gql`
    mutation InvoiceEmailSend($id: ID!) {
        invoiceSendNotification(id: $id) {
            errors {
                ...InvoiceError
                __typename
            }
            invoice {
                ...Invoice
                __typename
            }
            __typename
        }
    }

    fragment InvoiceError on InvoiceError {
        code
        field
        message
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const ASSIGN_TAG_PRODUCT = gql`
    mutation UpdateProduct($id: ID!, $input: ProductInput!) {
        productUpdate(id: $id, input: $input) {
            product {
                id
                name
                description
                tags {
                    name
                }
            }
        }
    }
`;

export const CREATE_CUSTOMER_ADDRESS = gql`
    mutation CreateCustomerAddress($id: ID!, $input: AddressInput!) {
        addressCreate(userId: $id, input: $input) {
            errors {
                ...AccountError
                __typename
            }
            address {
                ...Address
                __typename
            }
            user {
                ...CustomerAddresses
                __typename
            }
            __typename
        }
    }

    fragment AccountError on AccountError {
        code
        field
        addressType
        message
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment CustomerAddresses on User {
        ...Customer
        addresses {
            ...Address
            __typename
        }
        defaultBillingAddress {
            id
            __typename
        }
        defaultShippingAddress {
            id
            __typename
        }
        __typename
    }

    fragment Customer on User {
        id
        email
        firstName
        lastName
        __typename
    }
`;

export const PRODUCT_SEARCH = gql`
    query ProductSearchbyName($query: String!, $channel: String!) {
        products(first: 100, channel: $channel, search: $query, sortBy: { direction: DESC, field: NAME }) {
            edges {
                node {
                    id
                    name
                    defaultVariant {
                        id
                        name
                        __typename
                    }
                    thumbnail {
                        url
                        __typename
                    }
                    pricing {
                        priceRange {
                            start {
                                gross {
                                    amount
                                    __typename
                                }
                                __typename
                            }
                            stop {
                                gross {
                                    amount
                                    __typename
                                }
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                    variants {
                        id
                        images {
                            url
                            id
                            __typename
                        }
                        name
                        __typename
                        costPrice
                        pricing {
                            price {
                                gross {
                                    amount
                                    currency
                                }
                            }
                        }
                    }
                    __typename
                }
                __typename
            }
            __typename
        }
    }
`;

export const FILTER_PRODUCT_LIST = gql`
    query SearchOrderVariant($channel: String!, $first: Int!, $query: String!, $after: String, $address: AddressInput, $isPublished: Boolean, $stockAvailability: StockAvailability) {
        search: products(first: $first, after: $after, filter: { search: $query, isPublished: $isPublished, stockAvailability: $stockAvailability }, channel: $channel) {
            edges {
                node {
                    id
                    name
                    thumbnail {
                        url
                        __typename
                    }
                    variants {
                        id
                        name
                        sku
                        pricing(address: $address) {
                            priceUndiscounted {
                                gross {
                                    ...Money
                                    __typename
                                }
                                __typename
                            }
                            price {
                                gross {
                                    ...Money
                                    __typename
                                }
                                __typename
                            }
                            onSale
                            __typename
                        }
                        __typename
                    }
                    __typename
                }
                __typename
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                __typename
            }
            __typename
        }
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }
`;

export const REMOVE_IMAGE = gql`
    mutation ProductMediaDelete($id: ID!) {
        productMediaDelete(id: $id) {
            errors {
                ...ProductError
                __typename
            }
            product {
                id
                media {
                    id
                    __typename
                    url
                    type
                    oembedData
                }
                __typename
            }
            __typename
        }
    }

    fragment ProductError on ProductError {
        code
        field
        message
        __typename
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation ProductUpdate($id: ID!, $input: ProductInput!) {
        productUpdate(id: $id, input: $input) {
            errors {
                ...ProductErrorWithAttributes
                __typename
            }
            __typename
        }
    }

    fragment ProductErrorWithAttributes on ProductError {
        ...ProductError
        attributes
        __typename
    }

    fragment ProductError on ProductError {
        code
        field
        message
        __typename
    }
`;

export const DELETE_VARIENT = gql`
    mutation VariantDelete($id: ID!) {
        productVariantDelete(id: $id) {
            errors {
                ...ProductError
                __typename
            }
            productVariant {
                id
                __typename
            }
            __typename
        }
    }

    fragment ProductError on ProductError {
        code
        field
        message
        __typename
    }
`;

export const DELETE_PRODUCTS = gql`
    mutation productBulkDelete($ids: [ID!]!) {
        productBulkDelete(ids: $ids) {
            errors {
                ...ProductError
                __typename
            }
            __typename
        }
    }

    fragment ProductError on ProductError {
        code
        field
        message
        __typename
    }
`;

export const DELETE_CUSTOMER = gql`
    mutation BulkRemoveCustomers($ids: [ID!]!) {
        customerBulkDelete(ids: $ids) {
            errors {
                ...AccountError
                __typename
            }
            __typename
        }
    }

    fragment AccountError on AccountError {
        code
        field
        addressType
        message
        __typename
    }
`;

export const DELETE_CUSTOMER_ADDRESS = gql`
    mutation RemoveCustomerAddress($id: ID!) {
        addressDelete(id: $id) {
            errors {
                ...AccountError
                __typename
            }
            user {
                ...CustomerAddresses
                __typename
            }
            __typename
        }
    }

    fragment AccountError on AccountError {
        code
        field
        addressType
        message
        __typename
    }

    fragment CustomerAddresses on User {
        ...Customer
        addresses {
            ...Address
            __typename
        }
        defaultBillingAddress {
            id
            __typename
        }
        defaultShippingAddress {
            id
            __typename
        }
        __typename
    }

    fragment Customer on User {
        id
        email
        firstName
        lastName
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }
`;

export const SET_DEFAULT_ADDRESS = gql`
    mutation SetCustomerDefaultAddress($addressId: ID!, $userId: ID!, $type: AddressTypeEnum!) {
        addressSetDefault(addressId: $addressId, userId: $userId, type: $type) {
            errors {
                ...AccountError
                __typename
            }
            user {
                ...CustomerAddresses
                __typename
            }
            __typename
        }
    }

    fragment AccountError on AccountError {
        code
        field
        addressType
        message
        __typename
    }

    fragment CustomerAddresses on User {
        ...Customer
        addresses {
            ...Address
            __typename
        }
        defaultBillingAddress {
            id
            __typename
        }
        defaultShippingAddress {
            id
            __typename
        }
        __typename
    }

    fragment Customer on User {
        id
        email
        firstName
        lastName
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }
`;

export const PRODUCTS_MEDIA_ORDERS = gql`
    mutation ProductMediaReorder($productId: ID!, $mediaIds: [ID!]!) {
        productMediaReorder(productId: $productId, mediaIds: $mediaIds) {
            errors {
                ...ProductError
                __typename
            }
            product {
                id
                media {
                    id
                    alt
                    sortOrder
                    url
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment ProductError on ProductError {
        code
        field
        message
        __typename
    }
`;

export const ORDER_DISCOUNT_UPDATE = gql`
    mutation OrderDiscountUpdate($input: OrderDiscountCommonInput!, $discountId: ID!) {
        orderDiscountUpdate(input: $input, discountId: $discountId) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const SHIPPING_COST_UPDATE = gql`
    mutation OrderShippingMethodUpdate($id: ID!, $input: OrderUpdateShippingInput!) {
        orderUpdateShipping(order: $id, input: $input) {
            errors {
                ...OrderError
                __typename
            }
            order {
                shippingMethods {
                    id
                    name
                    __typename
                }
                total {
                    tax {
                        amount
                        currency
                        __typename
                    }
                    gross {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                id
                shippingMethod {
                    id
                    name
                    price {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                shippingMethodName
                shippingPrice {
                    gross {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const CUSTOMER_ADDRESS = gql`
    query CustomerAddresses($id: ID!) {
        user(id: $id) {
            ...CustomerAddresses
            __typename
        }
    }

    fragment CustomerAddresses on User {
        ...Customer
        addresses {
            ...Address
            __typename
        }
        defaultBillingAddress {
            id
            __typename
            city
            country {
                country
            }
            countryArea
            lastName
            firstName
            phone
            streetAddress1
            streetAddress2
            postalCode
            __typename
        }
        defaultShippingAddress {
            id
            __typename
            city
            country {
                country
            }
            countryArea
            lastName
            firstName
            phone
            streetAddress1
            streetAddress2
            postalCode
        }
        __typename
    }

    fragment Customer on User {
        id
        email
        firstName
        lastName
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }
`;

export const ADD_NEW_LINE = gql`
    mutation OrderLinesAdd($id: ID!, $input: [OrderLineCreateInput!]!) {
        orderLinesCreate(id: $id, input: $input) {
            errors {
                ...OrderError
                __typename
            }
            order {
                id
                lines {
                    ...OrderLine
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }
`;

export const DELETE_LINE = gql`
    mutation OrderLineDelete($id: ID!) {
        orderLineDelete(id: $id) {
            errors {
                ...OrderError
                __typename
            }
            order {
                id
                lines {
                    ...OrderLine
                    __typename
                }
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }
`;

export const UPDATE_LINE = gql`
    mutation OrderLineUpdate($id: ID!, $input: OrderLineInput!) {
        orderLineUpdate(id: $id, input: $input) {
            errors {
                ...OrderError
                __typename
            }
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }
`;

export const CREATE_DRAFT_ORDER = gql`
    mutation OrderDraftCreate($input: DraftOrderCreateInput!) {
        draftOrderCreate(input: $input) {
            errors {
                ...OrderError
                __typename
            }
            order {
                id
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }
`;

export const UPDATE_DRAFT_ORDER = gql`
    mutation OrderDraftUpdate($id: ID!, $input: DraftOrderInput!) {
        draftOrderUpdate(id: $id, input: $input) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const PARENT_CATEGORY_LIST = gql`
    query MyQuery {
        categories(level: 0, first: 100) {
            edges {
                node {
                    id
                    name
                    description
                    children(first: 100) {
                        edges {
                            node {
                                id
                                name
                                description
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const CONFIRM_ORDER = gql`
    mutation OrderConfirm($id: ID!) {
        orderConfirm(id: $id) {
            errors {
                ...OrderError
                __typename
            }
            order {
                ...OrderDetails
                __typename
            }
            __typename
        }
    }

    fragment OrderError on OrderError {
        code
        field
        addressType
        message
        orderLines
        __typename
    }

    fragment OrderDetails on Order {
        id
        token
        ...Metadata
        billingAddress {
            ...Address
            __typename
        }
        transactions {
            ...TransactionItem
            __typename
        }
        payments {
            ...OrderPayment
            __typename
        }
        giftCards {
            ...OrderGiftCard
            __typename
        }
        grantedRefunds {
            ...OrderGrantedRefund
            __typename
        }
        isShippingRequired
        canFinalize
        created
        customerNote
        discounts {
            id
            type
            calculationMode: valueType
            value
            reason
            amount {
                ...Money
                __typename
            }
            __typename
        }
        events {
            ...OrderEvent
            __typename
        }
        fulfillments {
            ...Fulfillment
            __typename
        }
        lines {
            ...OrderLine
            __typename
        }
        number
        isPaid
        paymentStatus
        shippingAddress {
            ...Address
            __typename
        }
        deliveryMethod {
            __typename
            ... on ShippingMethod {
                id
                __typename
            }
            ... on Warehouse {
                id
                clickAndCollectOption
                __typename
            }
        }
        shippingMethod {
            id
            __typename
        }
        shippingMethodName
        collectionPointName
        shippingPrice {
            gross {
                amount
                currency
                __typename
            }
            __typename
        }
        status
        subtotal {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            __typename
        }
        total {
            gross {
                ...Money
                __typename
            }
            net {
                ...Money
                __typename
            }
            tax {
                ...Money
                __typename
            }
            __typename
        }
        totalRemainingGrant {
            ...Money
            __typename
        }
        totalGrantedRefund {
            ...Money
            __typename
        }
        totalRefundPending {
            ...Money
            __typename
        }
        totalRefunded {
            ...Money
            __typename
        }
        actions
        totalAuthorizePending {
            ...Money
            __typename
        }
        totalAuthorized {
            ...Money
            __typename
        }
        totalCaptured {
            ...Money
            __typename
        }
        totalCharged {
            ...Money
            __typename
        }
        totalChargePending {
            ...Money
            __typename
        }
        totalCanceled {
            ...Money
            __typename
        }
        totalCancelPending {
            ...Money
            __typename
        }
        totalBalance {
            ...Money
            __typename
        }
        undiscountedTotal {
            net {
                ...Money
                __typename
            }
            gross {
                ...Money
                __typename
            }
            __typename
        }
        user {
            id
            email
            __typename
        }
        userEmail
        shippingMethods {
            id
            name
            price {
                ...Money
                __typename
            }
            active
            message
            __typename
        }
        invoices {
            ...Invoice
            __typename
        }
        channel {
            isActive
            id
            name
            currencyCode
            slug
            defaultCountry {
                code
                __typename
            }
            orderSettings {
                markAsPaidStrategy
                __typename
            }
            __typename
        }
        isPaid
        __typename
    }

    fragment Metadata on ObjectWithMetadata {
        metadata {
            ...MetadataItem
            __typename
        }
        privateMetadata {
            ...MetadataItem
            __typename
        }
        __typename
    }

    fragment MetadataItem on MetadataItem {
        key
        value
        __typename
    }

    fragment Address on Address {
        city
        cityArea
        companyName
        country {
            __typename
            code
            country
        }
        countryArea
        firstName
        id
        lastName
        phone
        postalCode
        streetAddress1
        streetAddress2
        __typename
    }

    fragment TransactionItem on TransactionItem {
        id
        pspReference
        actions
        name
        externalUrl
        events {
            ...TransactionEvent
            __typename
        }
        authorizedAmount {
            ...Money
            __typename
        }
        chargedAmount {
            ...Money
            __typename
        }
        refundedAmount {
            ...Money
            __typename
        }
        canceledAmount {
            ...Money
            __typename
        }
        authorizePendingAmount {
            ...Money
            __typename
        }
        chargePendingAmount {
            ...Money
            __typename
        }
        refundPendingAmount {
            ...Money
            __typename
        }
        cancelPendingAmount {
            ...Money
            __typename
        }
        __typename
    }

    fragment TransactionEvent on TransactionEvent {
        id
        pspReference
        amount {
            ...Money
            __typename
        }
        type
        message
        createdAt
        createdBy {
            ... on User {
                ...StaffMemberAvatar
                __typename
            }
            ... on App {
                ...AppAvatar
                __typename
            }
            __typename
        }
        externalUrl
        __typename
    }

    fragment Money on Money {
        amount
        currency
        __typename
    }

    fragment StaffMemberAvatar on User {
        ...StaffMember
        avatar(size: 512) {
            url
            __typename
        }
        __typename
    }

    fragment StaffMember on User {
        id
        email
        firstName
        isActive
        lastName
        __typename
    }

    fragment AppAvatar on App {
        id
        name
        __typename
    }

    fragment OrderPayment on Payment {
        id
        isActive
        actions
        gateway
        paymentMethodType
        availableCaptureAmount {
            ...Money
            __typename
        }
        capturedAmount {
            ...Money
            __typename
        }
        total {
            ...Money
            __typename
        }
        availableRefundAmount {
            ...Money
            __typename
        }
        modified
        transactions {
            id
            token
            created
            kind
            isSuccess
            __typename
        }
        __typename
    }

    fragment OrderGiftCard on GiftCard {
        id
        last4CodeChars
        events {
            id
            type
            orderId
            date
            balance {
                initialBalance {
                    ...Money
                    __typename
                }
                currentBalance {
                    ...Money
                    __typename
                }
                oldInitialBalance {
                    ...Money
                    __typename
                }
                oldCurrentBalance {
                    ...Money
                    __typename
                }
                __typename
            }
            __typename
        }
        __typename
    }

    fragment OrderGrantedRefund on OrderGrantedRefund {
        id
        createdAt
        shippingCostsIncluded
        amount {
            currency
            amount
            __typename
        }
        reason
        user {
            ...UserBaseAvatar
            __typename
        }
        app {
            id
            name
            __typename
        }
        __typename
    }

    fragment UserBaseAvatar on User {
        id
        firstName
        lastName
        email
        avatar {
            url
            alt
            __typename
        }
        __typename
    }

    fragment OrderEvent on OrderEvent {
        id
        amount
        shippingCostsIncluded
        date
        email
        emailType
        invoiceNumber
        discount {
            valueType
            value
            reason
            amount {
                amount
                currency
                __typename
            }
            oldValueType
            oldValue
            oldAmount {
                amount
                currency
                __typename
            }
            __typename
        }
        relatedOrder {
            id
            number
            __typename
        }
        message
        quantity
        transactionReference
        type
        user {
            id
            email
            firstName
            lastName
            __typename
        }
        app {
            id
            name
            appUrl
            __typename
        }
        lines {
            quantity
            itemName
            discount {
                valueType
                value
                reason
                amount {
                    amount
                    currency
                    __typename
                }
                oldValueType
                oldValue
                oldAmount {
                    amount
                    currency
                    __typename
                }
                __typename
            }
            orderLine {
                id
                productName
                variantName
                __typename
            }
            __typename
        }
        __typename
    }

    fragment Fulfillment on Fulfillment {
        ...Metadata
        id
        lines {
            id
            quantity
            orderLine {
                ...OrderLine
                __typename
            }
            __typename
        }
        fulfillmentOrder
        status
        trackingNumber
        warehouse {
            id
            name
            __typename
        }
        __typename
    }

    fragment OrderLine on OrderLine {
        id
        isShippingRequired
        allocations {
            id
            quantity
            warehouse {
                id
                name
                __typename
            }
            __typename
        }
        variant {
            id
            name
            quantityAvailable
            preorder {
                endDate
                __typename
            }
            stocks {
                ...Stock
                __typename
            }
            product {
                id
                isAvailableForPurchase
                __typename
            }
            __typename
        }
        productName
        productSku
        quantity
        quantityFulfilled
        quantityToFulfill
        totalPrice {
            ...TaxedMoney
            __typename
        }
        unitDiscount {
            amount
            currency
            __typename
        }
        unitDiscountValue
        unitDiscountReason
        unitDiscountType
        undiscountedUnitPrice {
            currency
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        unitPrice {
            gross {
                amount
                currency
                __typename
            }
            net {
                amount
                currency
                __typename
            }
            __typename
        }
        thumbnail {
            url
            __typename
        }
        __typename
    }

    fragment Stock on Stock {
        id
        quantity
        quantityAllocated
        warehouse {
            ...Warehouse
            __typename
        }
        __typename
    }

    fragment Warehouse on Warehouse {
        id
        name
        __typename
    }

    fragment TaxedMoney on TaxedMoney {
        net {
            ...Money
            __typename
        }
        gross {
            ...Money
            __typename
        }
        __typename
    }

    fragment Invoice on Invoice {
        id
        number
        createdAt
        url
        status
        __typename
    }
`;

export const CATEGORY_FILTER_LIST = gql`
    query ProductListPaginated($channel: String!, $first: Int!, $after: String, $categoryId: [ID!]!) {
        products(filter: { categories: $categoryId }, first: $first, after: $after, channel: $channel) {
            totalCount
            edges {
                node {
                    ...ProductListItem
                    tags {
                        name
                        id
                    }
                    __typename
                }
                cursor
                __typename
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                __typename
            }
            __typename
        }
    }

    fragment ProductListItem on Product {
        id
        name
        slug
        pricing {
            priceRange {
                start {
                    gross {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                stop {
                    gross {
                        amount
                        currency
                        __typename
                    }
                    __typename
                }
                __typename
            }
            discount {
                currency
                __typename
            }
            __typename
        }
        category {
            id
            name
            __typename
        }
        thumbnail(size: 1024, format: WEBP) {
            url
            alt
            __typename
        }
        variants {
            id
            __typename
        }
        images {
            url
            __typename
        }
        description
        updatedAt
        channelListings {
            publishedAt
            isPublished
            __typename
        }
        __typename
    }
`;

export const EXPORT_LIST = gql`
    query OrdersExport($first: Int!, $filter: OrderFilterInput, $sort: OrderSortingInput) {
        orders(first: $first, filter: $filter, sortBy: $sort) {
            edges {
                node {
                    shippingAddress {
                        firstName
                        lastName
                        phone
                        streetAddress1
                        streetAddress2
                        countryArea
                        country {
                            country
                        }
                        city
                    }
                    userEmail
                    created
                    paymentStatusDisplay
                    channel {
                        currencyCode
                    }
                    total {
                        gross {
                            amount
                            currency
                        }
                        tax {
                            amount
                            currency
                        }
                    }
                    shippingPrice {
                        gross {
                            amount
                            currency
                        }
                    }
                    id
                    lines {
                        productName
                        productSku
                        totalPrice {
                            gross {
                                amount
                                currency
                            }
                        }
                    }
                    number
                    user {
                        lastName
                        firstName
                    }
                    updatedAt
                    status
                    paymentStatus
                }
            }
        }
    }
`;
