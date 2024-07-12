import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment, useRef, useCallback } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconBell from '@/components/Icon/IconBell';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconPencil from '@/components/Icon/IconPencil';
import { Button } from '@mantine/core';
import Dropdown from '../../../components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';

import { Dialog, Transition } from '@headlessui/react';
import IconX from '@/components/Icon/IconX';
import Image1 from '@/public/assets/images/profile-1.jpeg';
import Image2 from '@/public/assets/images/profile-2.jpeg';
import Image3 from '@/public/assets/images/profile-3.jpeg';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import IconEye from '@/components/Icon/IconEye';
import { date } from 'yup/lib/locale';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IconEdit from '@/components/Icon/IconEdit';
import Select from 'react-select';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
// const ReactQuill = dynamic(import('react-quill'), { ssr: false });

import { Tab } from '@headlessui/react';
import AnimateHeight from 'react-animate-height';
import { useMutation, useQuery } from '@apollo/client';
import {
    ASSIGN_TAG_PRODUCT,
    CATEGORY_LIST,
    CHANNEL_LIST,
    COLLECTION_LIST,
    COLOR_LIST,
    CREATE_PRODUCT,
    CREATE_VARIANT,
    DELETE_VARIENT,
    DESIGN_LIST,
    FINISH_LIST,
    PRODUCTS_MEDIA_ORDERS,
    PRODUCT_CAT_LIST,
    PRODUCT_DETAILS,
    PRODUCT_FULL_DETAILS,
    PRODUCT_LIST_TAGS,
    PRODUCT_MEDIA_CREATE,
    PRODUCT_TYPE_LIST,
    REMOVE_IMAGE,
    SIZE_LIST,
    STONE_LIST,
    STYLE_LIST,
    TYPE_LIST,
    UPDATE_META_DATA,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_CHANNEL,
    UPDATE_VARIANT,
    UPDATE_VARIANT_LIST,
} from '@/query/product';
import { Failure, Success, getValueByKey, objIsEmpty, sampleParams, showDeleteAlert, uploadImage } from '@/utils/functions';
import PrivateRouter from '@/components/Layouts/PrivateRouter';
import IconLoader from '@/components/Icon/IconLoader';
const ProductEdit = (props: any) => {
    const router = useRouter();

    const { id } = router.query;

    const isRtl = useSelector((state: any) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const [value, setValue] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Update Product'));
    });

    const [isMounted, setIsMounted] = useState(false); //tabs
    useEffect(() => {
        setIsMounted(true);
    });
    const [salePrice, setSalePrice] = useState('');
    const [menuOrder, setMenuOrder] = useState(0);

    // ------------------------------------------New Data--------------------------------------------

    const [productName, setProductName] = useState('');
    const [slug, setSlug] = useState('');
    const [seoTittle, setSeoTittle] = useState('');
    const [seoDesc, setSeoDesc] = useState('');

    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [selectedCollection, setSelectedCollection] = useState<any>([]);
    const [stackMgmt, setStackMgmt] = useState(false);
    const [publish, setPublish] = useState('published');

    // error message start

    const [productNameErrMsg, setProductNameErrMsg] = useState('');
    const [slugErrMsg, setSlugErrMsg] = useState('');
    const [seoTittleErrMsg, setSeoTittleErrMsg] = useState('');
    const [seoDescErrMsg, setSeoDescErrMsg] = useState('');
    const [shortDesErrMsg, setShortDesErrMsg] = useState('');
    const [skuErrMsg, setSkuErrMsg] = useState('');
    const [salePriceErrMsg, setSalePriceErrMsg] = useState('');
    const [categoryErrMsg, setCategoryErrMsg] = useState('');
    const [attributeError, setAttributeError] = useState('');
    const [variantErrors, setVariantErrors] = useState<any>([]);

    // error message end

    // ------------------------------------------New Data--------------------------------------------
    const [quantityTrack, setQuantityTrack] = useState(true);
    const [active, setActive] = useState<string>('1');
    // track stock
    const trackStock = (value: any) => {
        setQuantityTrack(!quantityTrack);
    };

    const options = [
        { value: 'New', label: 'New' },
        { value: 'Hot', label: 'Hot' },
    ];

    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    // -------------------------------------New Added-------------------------------------------------------
    const { data: productDetails, refetch: productDataRefetch } = useQuery(PRODUCT_FULL_DETAILS, {
        variables: { channel: 'india-channel', id: id },
    });

    const { data: tagsList } = useQuery(PRODUCT_LIST_TAGS, {
        variables: { channel: 'india-channel', id: id },
    });

    // console.log('productDetails: ', productDetails);

    const { error, data: orderDetails } = useQuery(CHANNEL_LIST, {
        variables: sampleParams,
    });

    const { data: cat_list } = useQuery(PRODUCT_CAT_LIST, {
        variables: sampleParams,
    });

    const { data: collection_list } = useQuery(COLLECTION_LIST, {
        variables: sampleParams,
    });

    const { data: productTypelist } = useQuery(PRODUCT_TYPE_LIST, {
        variables: sampleParams,
    });

    const { data: finishData } = useQuery(FINISH_LIST, {
        variables: sampleParams,
    });

    const { data: stoneData } = useQuery(STONE_LIST, {
        variables: sampleParams,
    });
    const { data: designData } = useQuery(DESIGN_LIST, {
        variables: sampleParams,
    });
    const { data: styleData } = useQuery(STYLE_LIST, {
        variables: sampleParams,
    });

    const { data: stoneColorData } = useQuery(COLOR_LIST, {
        variables: sampleParams,
    });

    const { data: typeData } = useQuery(TYPE_LIST, {
        variables: sampleParams,
    });

    const { data: sizeData } = useQuery(SIZE_LIST, {
        variables: sampleParams,
    });

    const [addFormData] = useMutation(CREATE_PRODUCT);
    const [updateProductChannelList] = useMutation(UPDATE_PRODUCT_CHANNEL);
    const [updateVariantList] = useMutation(UPDATE_VARIANT_LIST);
    const [updateVariant] = useMutation(UPDATE_VARIANT);
    const [updateMedatData] = useMutation(UPDATE_META_DATA);
    const [assignTagToProduct] = useMutation(ASSIGN_TAG_PRODUCT);
    const [mediaReorder] = useMutation(PRODUCTS_MEDIA_ORDERS);
    const [createVariant] = useMutation(CREATE_VARIANT);
    const [removeImage] = useMutation(REMOVE_IMAGE);
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const [deleteVarient] = useMutation(DELETE_VARIENT);

    const [createProductMedia] = useMutation(PRODUCT_MEDIA_CREATE);

    const [categoryList, setCategoryList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [collectionList, setCollectionList] = useState([]);
    const [label, setLabel] = useState<any>('');
    const [productData, setProductData] = useState({});
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);

    const [productType, setProductType] = useState([]);
    const [mediaData, setMediaData] = useState([]);

    const [imageUrl, setImageUrl] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState<any>({});
    const [file, setFile] = useState(null);

    const [thumbnail, setThumbnail] = useState('');
    const [isthumbImgUpdate, setIsthumbImgUpdate] = useState(false);

    const [images, setImages] = useState<any>([]);

    const [selectedArr, setSelectedArr] = useState<any>([]);
    const [accordions, setAccordions] = useState<any>([]);
    const [openAccordion, setOpenAccordion] = useState<any>('');
    const [chooseType, setChooseType] = useState<any>('');
    const [selectedValues, setSelectedValues] = useState<any>({});
    const [dropdowndata, setDropdownData] = useState<any>([]);
    const [dropIndex, setDropIndex] = useState<any>(null);
    const [descriptionContent, setDescriptionContent] = useState<any>('');
    const [updateLoading, setUpdateLoading] = useState(false);

    const [variants, setVariants] = useState([
        {
            sku: '',
            stackMgmt: false,
            quantity: 0,
            regularPrice: 0,
            salePrice: 0,
            name: '',
            id: '',
        },
    ]);

    // editor js
    const editorRef: any = useRef(null);
    const [editorInstance, setEditorInstance] = useState<any>(null);
    // const [content, setContent] = useState('');
    // let count = 0;

    // useEffect(() => {
    //     if (count === 0) {
    //         editor();
    //         count = 1;
    //     }
    // }, []);

    // let editors = { isReady: false };
    // useEffect(() => {
    //   if (!editors.isReady) {
    //     editor();
    //     editors.isReady = true;
    //   }

    //   return () => {
    //     if (editorInstance) {
    //       editorInstance?.blocks?.clear();
    //     }
    //   };
    // }, [value, productDetails]);

    // State to track whether delete icon should be displayed

    const [selectedCat, setselectedCat] = useState<any>('');

    useEffect(() => {
        productsDetails();
    }, [productDetails, dropdowndata]);

    useEffect(() => {
        tags_list();
    }, [tagsList]);

    useEffect(() => {
        category_list();
    }, [cat_list]);

    useEffect(() => {
        collections_list();
    }, [collection_list]);

    useEffect(() => {
        productsType();
    }, [productTypelist]);

    useEffect(() => {
        const arr1 = {
            design: designData?.productDesigns,
            style: styleData?.productStyles,
            finish: finishData?.productFinishes,
            stoneType: stoneData?.productStoneTypes,
            stoneColor: stoneColorData?.stoneColors,
            type: typeData?.itemTypes,
            size: sizeData?.sizes,
        };

        const singleObj = Object.entries(arr1).reduce((acc: any, [key, value]) => {
            acc[key] = value?.edges.map(({ node }: any) => ({ value: node?.id, label: node?.name }));
            return acc;
        }, {});

        setDropdownData(singleObj);
    }, [finishData, stoneData, designData, styleData, typeData, sizeData, stoneColorData]);

    //     const updateEditorValue = (newValue) => {
    // console.log('✌️newValue --->', newValue);
    //         setValue(newValue);
    //         console.log("value", value)
    //       }

    const productsDetails = async () => {
        try {
            if (productDetails) {
                if (productDetails && productDetails?.product) {
                    const data = productDetails?.product;
                    console.log('data: ', data);
                    setProductData(data);
                    setSlug(data?.slug);
                    setSeoTittle(data?.seoTitle);
                    setSeoDesc(data?.seoDescription);
                    setProductName(data?.name);
                    const category: any = categoryList?.find((item: any) => item.value === data?.category?.id);
                    setselectedCat(category);
                    if (data?.tags?.length > 0) {
                        const tags: any = data?.tags?.map((item: any) => ({ value: item.id, label: item.name }));
                        setSelectedTag(tags);
                    } else {
                        setSelectedTag([]);
                    }
                    if (data?.collections?.length > 0) {
                        const collection: any = data?.collections?.map((item: any) => ({ value: item.id, label: item.name }));
                        setSelectedCollection(collection);
                    }
                    setMenuOrder(data?.orderNo);

                    // const stringDescription = data.description;
                    // const removeString = JSON.parse(stringDescription);
                    // const Description = removeString.blocks.map((block) => block.data.text).join('');

                    // console.log('Description --->', Description);

                    const Description = data.description;
                    setDescriptionContent(JSON.parse(Description));
                    console.log('descriptionContent', descriptionContent);
                    // const desciption1 = {
                    //     time: Date.now(),
                    //     blocks: [
                    //         {
                    //             type: 'paragraph',
                    //             data: {
                    //                 text: 'This is api  content.',
                    //             },
                    //         },
                    //     ],
                    //     version: '2.19.0',
                    // };

                    setValue(Description);

                    const shortDesc = getValueByKey(data?.metadata, 'short_descripton');
                    setShortDescription(shortDesc);

                    const label = getValueByKey(data?.metadata, 'label');
                    setLabel({ value: label, label: label });
                    const desc = getValueByKey(data?.metadata, 'description');
                    setDescription(desc);

                    setMediaData(data?.media);
                    setThumbnail(data?.thumbnail?.url);

                    if (data?.media?.length > 0) {
                        setImages(data?.media);
                    }

                    const arr = [];
                    const type: any[] = [];
                    let selectedAccValue: any = {};

                    const attributes = [
                        { key: 'prouctDesign', type: 'design', name: 'designName', dropdowndataKey: 'design' },
                        { key: 'productstyle', type: 'style', name: 'styleName', dropdowndataKey: 'style' },
                        { key: 'productStoneType', type: 'stone', name: 'stoneName', dropdowndataKey: 'stoneType' },
                        { key: 'productFinish', type: 'finish', name: 'finishName', dropdowndataKey: 'finish' },
                        { key: 'productStonecolor', type: 'stoneColor', name: 'stoneColorName', dropdowndataKey: 'stoneColor' },
                        { key: 'productItemtype', type: 'type', name: 'typeName', dropdowndataKey: 'type' },
                        { key: 'productSize', type: 'size', name: 'sizeName', dropdowndataKey: 'size' },
                    ];

                    attributes.forEach((attribute) => {
                        if (data?.[attribute.key]?.length > 0) {
                            const obj = {
                                type: attribute.type,
                                [attribute.name]: dropdowndata?.[attribute.dropdowndataKey],
                            };
                            arr.push(obj);
                            type.push(attribute.type);
                            selectedAccValue[attribute.type] = data?.[attribute.key].map((item: any) => item.id);
                        }
                    });
                    // if (data?.prouctDesign?.length > 0) {
                    //     const obj = {
                    //         type: 'design',
                    //         designName: dropdowndata?.design,
                    //     };
                    //     arr.push(obj);
                    //     type.push('design');
                    //     selectedAccValue.design = data?.prouctDesign?.map((item: any) => item.id);
                    // }
                    // if (data?.productstyle?.length > 0) {
                    //     const obj = {
                    //         type: 'style',
                    //         styleName: dropdowndata?.style,
                    //     };
                    //     arr.push(obj);
                    //     type.push('style');
                    //     selectedAccValue.style = data?.productstyle?.map((item: any) => item.id);
                    // }
                    // if (data?.productStoneType?.length > 0) {
                    //     const obj = {
                    //         type: 'stone',
                    //         stoneName: dropdowndata?.stoneType,
                    //     };
                    //     arr.push(obj);
                    //     type.push('stone');
                    //     selectedAccValue.stone = data?.productStoneType?.map((item: any) => item.id);
                    // }
                    // if (data?.productFinish?.length > 0) {
                    //     const obj = {
                    //         type: 'finish',
                    //         finishName: dropdowndata?.finish,
                    //     };
                    //     arr.push(obj);
                    //     type.push('finish');
                    //     selectedAccValue.finish = data?.productFinish?.map((item: any) => item.id);
                    // }

                    // if (data?.productStonecolor?.length > 0) {
                    //     const obj = {
                    //         type: 'stoneColor',
                    //         stoneColorName: dropdowndata?.stoneColor,
                    //     };
                    //     arr.push(obj);
                    //     type.push('stoneColor');
                    //     selectedAccValue.stoneColor = data?.productStonecolor?.map((item: any) => item.id);
                    // }
                    // //Type
                    // if (data?.productItemtype?.length > 0) {
                    //     const obj = {
                    //         type: 'type',
                    //         typeName: dropdowndata?.type,
                    //     };
                    //     arr.push(obj);
                    //     type.push('type');
                    //     selectedAccValue.type = data?.productItemtype?.map((item: any) => item.id);
                    // }

                    // //size
                    // if (data?.productSize?.length > 0) {
                    //     const obj = {
                    //         type: 'size',
                    //         sizeName: dropdowndata?.size,
                    //     };
                    //     arr.push(obj);
                    //     type.push('size');
                    //     selectedAccValue.size = data?.productSize?.map((item: any) => item.id);
                    // }

                    // const selectedAccValue: any = {};

                    setAccordions(arr.flat());
                    setSelectedArr(type);
                    setSelectedValues(selectedAccValue);
                    if (data?.variants?.length > 0) {
                        const variant = data?.variants?.map((item: any) => ({
                            sku: item.sku,
                            stackMgmt: item.trackInventory,
                            quantity: item?.stocks[0]?.quantity,
                            regularPrice: item.channelListings[0]?.costPrice?.amount,
                            salePrice: item.channelListings[0]?.price?.amount,
                            name: item.name,
                            id: item.id,
                            channelId: item.channelListings[0]?.id,
                            stockId: item?.stocks[0]?.id,
                        }));
                        setVariants(variant);
                    }
                    setPublish(data?.channelListings[0]?.isPublished == true ? 'published' : 'draft');

                    // setRegularPrice()
                }
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    // editor start

    let editors = { isReady: false };
    useEffect(() => {
        if (!editors.isReady) {
            editor();
            editors.isReady = true;
        }

        return () => {
            if (editorInstance) {
                editorInstance?.blocks?.clear();
            }
        };
    }, [descriptionContent]);

    // const editorRef = useRef(null); // Define a ref to hold the editor instance

    const editor = useCallback(() => {
        // Check if the window object is available and if the editorRef.current is set
        if (typeof window === 'undefined' || !editorRef.current) return;

        // Ensure only one editor instance is created
        if (editorInstance) {
            return;
        }

        // console.log('value2: ', value2);
        // Dynamically import the EditorJS module
        import('@editorjs/editorjs').then(({ default: EditorJS }) => {
            // Create a new instance of EditorJS with the appropriate configuration

            const editor = new EditorJS({
                holder: editorRef.current,
                //  data: {
                //         blocks: descriptionContent || [],
                //     },
                tools: {
                    // Configure tools as needed
                    header: {
                        class: require('@editorjs/header'),
                    },
                    list: {
                        class: require('@editorjs/list'),
                    },
                    table: {
                        class: require('@editorjs/table'),
                    },
                },
            });
            // Set the editorInstance state variable
            setEditorInstance(editor);
        });

        // Cleanup function to destroy the current editor instance when the component unmounts
        return () => {
            if (editorInstance) {
                editorInstance?.blocks?.clear();
            }
        };
    }, [editorInstance, descriptionContent]);
    // editor end

    // const editor = () => {
    //     // Check if the window object is available and if the editorRef.current is set
    //     if (typeof window === 'undefined' || !editorRef.current) return;

    //     // Destroy the previous editor instance, if it exists
    //     if (editorInstance) {
    //         editorInstance?.blocks?.clear();
    //     }

    //     console.log('value: ', value);
    //     // Dynamically import the EditorJS module
    //     import('@editorjs/editorjs').then(({ default: EditorJS }) => {
    //         // Create a new instance of EditorJS with the appropriate configuration
    //         const editor = new EditorJS({
    //             holder: editorRef.current,
    //             data: value,
    //             tools: {
    //                 // Configure tools as needed
    //                 header: {
    //                     class: require('@editorjs/header'),
    //                 },
    //                 list: {
    //                     class: require('@editorjs/list'),
    //                 },
    //                 table: {
    //                     class: require('@editorjs/table'),
    //                 },
    //             },
    //         });

    //         // Set the editorInstance state variable
    //         setEditorInstance(editor);
    //     });

    //     // Cleanup function to destroy the current editor instance when the component unmounts
    //     return () => {
    //         if (editorInstance) {
    //             editorInstance?.blocks?.clear();
    //         }
    //     };
    // };

    // editor end

    const category_list = async () => {
        try {
            if (cat_list) {
                if (cat_list && cat_list?.search?.edges?.length > 0) {
                    const list = cat_list?.search?.edges;
                    const dropdownData = list?.map((item: any) => {
                        return { value: item.node?.id, label: item.node?.name };
                    });

                    setCategoryList(dropdownData);
                }
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const tags_list = async () => {
        try {
            if (tagsList) {
                if (tagsList && tagsList?.tags?.edges?.length > 0) {
                    const list = tagsList?.tags?.edges;
                    const dropdownData = list?.map((item: any) => {
                        return { value: item.node?.id, label: item.node?.name };
                    });
                    setTagList(dropdownData);
                }
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const collections_list = async () => {
        try {
            if (collection_list) {
                if (collection_list && collection_list?.search?.edges?.length > 0) {
                    const list = collection_list?.search?.edges;
                    const dropdownData = list?.map((item: any) => {
                        return { value: item.node?.id, label: item.node?.name };
                    });

                    setCollectionList(dropdownData);
                }
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const productsType = async () => {
        try {
            if (productTypelist) {
                if (productTypelist && productTypelist?.search?.edges?.length > 0) {
                    const list = productTypelist?.search?.edges;
                    const dropdownData = list?.map((item: any) => {
                        return { value: item.node?.id, label: item.node?.name };
                    });

                    setProductType(dropdownData);
                }
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const selectCat = (cat: any) => {
        setselectedCat(cat);
        // console.log("cat: ", cat);
    };

    const selectedCollections = (data: any) => {
        setSelectedCollection(data);
    };

    // Function to handle file selection
    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImageUrl(imageUrl);
            setThumbnailFile(event.target.files[0]);
        }
    };

    const multiImgUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile: any = event.target.files?.[0];
        const imageUrl = URL.createObjectURL(selectedFile);

        // Push the selected file into the 'images' array
        // setImages((prevImages) => [...prevImages, selectedFile]);

        // Push the blob URL into the 'imageUrl' array
        // setImageUrl((prevUrls) => [...prevUrls, imageUrl]);

        setModal4(false);

        const res = await uploadImage(id, selectedFile);
        console.log('res: ', res);
        setImages(res?.data?.productMediaCreate?.product?.media);
    };

    const multiImageDelete = async (item: any) => {
        showDeleteAlert(
            async () => {
                const { data } = await removeImage({
                    variables: { id: item.id },
                });
                const pendingImg = data?.productMediaDelete?.product?.media;
                setImages(pendingImg);
                Swal.fire('Deleted!', 'Your files have been deleted.', 'success');
            },
            () => {
                Swal.fire('Cancelled', 'Your Image List is safe :)', 'error');
            }
        );
    };

    // Function to handle upload button click

    // Function to handle delete icon click
    const handleDelete = () => {
        // Clear the image URL from the state
        setImageUrl('');
        setThumbnail('');
        setThumbnailFile({});
        imageDelete(thumbnailFile.id);

        // const filter = images?.filter((item, index) => index !== 0);
        // setImages(filter);
    };

    const imageDelete = (ids: any) => {
        const { data }: any = removeImage({
            variables: { channel: 'india-channel', id: ids },
        });
    };

    const deleteProductGallery = (i: any) => {
        const filter = images?.filter((item: any, index: any) => index !== i);
        setImages(filter);
    };

    const updateProducts = async () => {
        console.log('updateProducts: ');
        try {
            setUpdateLoading(true);

            // Reset error messages
            const resetErrors = () => {
                setProductNameErrMsg('');
                setSlugErrMsg('');
                setSeoTittleErrMsg('');
                setSeoDescErrMsg('');
                setShortDesErrMsg('');
                setCategoryErrMsg('');
                setAttributeError('');
                setVariantErrors([]);
            };

            resetErrors();

            let hasError = false;
            let AttributesErrors: any = {};

            let newVariantErrors: any = [];

            // Validation
            const validateField = (value, setError, message) => {
                if (value.trim() === '') {
                    setError(message);
                    hasError = true;
                }
            };

            validateField(productName, setProductNameErrMsg, 'Product name cannot be empty');
            validateField(slug, setSlugErrMsg, 'Slug cannot be empty');
            validateField(seoTittle, setSeoTittleErrMsg, 'Seo title cannot be empty');
            validateField(seoDesc, setSeoDescErrMsg, 'Seo description cannot be empty');
            validateField(shortDescription, setShortDesErrMsg, 'Short description cannot be empty');
            if (selectedCat === '') {
                setCategoryErrMsg('Category cannot be empty');
                hasError = true;
            }

            console.log('selectedValues: ', selectedValues);

            // if (!objIsEmpty(selectedValues)) {
            //     if (selectedValues?.stone?.length > 0) {
            //         AttributesErrors.stone = 'Stone cannot be empty';
            //         hasError = true;
            //     }
            //     if (selectedValues?.design?.length > 0) {
            //         AttributesErrors.design = 'Design cannot be empty';
            //         hasError = true;
            //     }
            //     if (selectedValues?.style?.length > 0) {
            //         AttributesErrors.style = 'Style cannot be empty';
            //         hasError = true;
            //     }
            //     if (selectedValues?.finish?.length > 0) {
            //         AttributesErrors.finish = 'Finish cannot be empty';
            //         hasError = true;
            //     }

            //     if (selectedValues?.type?.length > 0) {
            //         AttributesErrors.type = 'Type cannot be empty';
            //         hasError = true;
            //     }

            //     if (selectedValues?.size?.length > 0) {
            //         AttributesErrors.size = 'Size cannot be empty';
            //         hasError = true;
            //     }

            //     if (selectedValues?.stoneColor?.length === 0) {
            //         AttributesErrors.stoneColor = 'Stone color cannot be empty';
            //         hasError = true;
            //     }

            //     setAttributeError(AttributesErrors);
            // }

            if (variants && variants.length > 0) {
                variants.forEach((variant, index) => {
                    let errors: any = {};

                    if (!variant.sku) {
                        errors.sku = 'SKU cannot be empty';
                        hasError = true;
                    }
                    if (variant.quantity <= 0 || isNaN(variant.quantity)) {
                        errors.quantity = 'Quantity must be a valid number and greater than 0';
                        hasError = true;
                    }
                    if (variant.regularPrice <= 0 || isNaN(variant.regularPrice)) {
                        errors.regularPrice = 'Regular Price must be a valid number and greater than 0';
                        hasError = true;
                    }
                    if (!variant.stackMgmt) {
                        errors.stackMgmt = 'Check Stack Management';
                        hasError = true;
                    }

                    newVariantErrors[index] = errors;
                });
                setVariantErrors(newVariantErrors);
            }

            // If there are any errors, do not proceed with the update
            if (hasError) {
                setUpdateLoading(false);
                return;
            }

            console.log('hasError: ', hasError);
            console.log('AttributesErrors: ', AttributesErrors);
            console.log('newVariantErrors: ', newVariantErrors);

            const tagId = selectedTag?.map((item) => item.value) || [];
            const { data } = await updateProduct({
                variables: {
                    id: id,
                    input: {
                        attributes: [],
                        category: selectedCat?.value,
                        collections: selectedCollection.map((item) => item.value),
                        tags: tagId,
                        name: productName,
                        rating: 0,
                        seo: {
                            description: seoDesc,
                            title: seoTittle,
                        },
                        slug: slug,
                        ...(menuOrder && menuOrder > 0 && { order_no: menuOrder }),
                        ...(selectedValues && selectedValues.design && { prouctDesign: selectedValues.design }),
                        ...(selectedValues && selectedValues.style && { productstyle: selectedValues.style }),
                        ...(selectedValues && selectedValues.finish && { productFinish: selectedValues.finish }),
                        ...(selectedValues && selectedValues.stone && { productStoneType: selectedValues.stone }),
                        ...(selectedValues && selectedValues.type && { productItemtype: selectedValues.type }),
                        ...(selectedValues && selectedValues.size && { productSize: selectedValues.size }),
                        ...(selectedValues && selectedValues.stoneColor && { productStonecolor: selectedValues.stoneColor }),
                    },
                    firstValues: 10,
                },
            });

            if (data?.productUpdate?.errors?.length > 0) {
                Failure(data?.productUpdate?.errors[0]?.message);
                setUpdateLoading(false);
                console.log('Error updating product');
            } else {
                productChannelListUpdate();
                console.log('Product update successful:', data);
            }
        } catch (error) {
            setUpdateLoading(false);

            console.error('Failed to update product:', error);
        } finally {
            setUpdateLoading(false);
        }
    };

    const productChannelListUpdate = async () => {
        try {
            const { data } = await updateProductChannelList({
                variables: {
                    id: id,
                    input: {
                        updateChannels: [
                            {
                                availableForPurchaseDate: null,
                                channelId: 'Q2hhbm5lbDoy',
                                isAvailableForPurchase: true,
                                isPublished: publish == 'draft' ? false : true,
                                publicationDate: null,
                                visibleInListings: true,
                            },
                        ],
                    },
                },
                // variables: { email: formData.email, password: formData.password },
            });
            if (data?.productChannelListingUpdate?.errors?.length > 0) {
                setUpdateLoading(false);
                Failure(data?.productChannelListingUpdate?.errors[0]?.message);
                console.log('error: ', data?.productChannelListingUpdate?.errors[0]?.message);
            } else {
                console.log('productChannelListUpdate: ', data);
                // variantCreate(productId);
                console.log('productChannelListUpdate end');
                variantListUpdate();
                console.log('variantListUpdate start');
            }
        } catch (error) {
            setUpdateLoading(false);

            console.log('error: ', error);
        }
    };

    const variantListUpdate = async () => {
        try {
            const arrayOfVariants = variants?.map((item: any) => ({
                attributes: [],
                id: item.id,
                sku: item.sku,
                name: item.name,
                trackInventory: item.stackMgmt,
                channelListings: {
                    update: [
                        {
                            channelListing: item.channelId,
                            price: item.regularPrice,
                            costPrice: item.regularPrice,
                        },
                    ],
                },
                stocks: {
                    update: [
                        {
                            quantity: item.stackMgmt ? item.quantity : 0,
                            stock: item.stockId,
                        },
                    ],
                },
            }));

            // const NewAddedVariant = arrayOfVariants.filter((item) => item.id == undefined);
            const NewAddedVariant = variants.filter((item) => item.id == undefined);

            const updateArr = arrayOfVariants.filter((item) => item.id != undefined);

            if (NewAddedVariant?.length > 0) {
                bulkVariantCreate(NewAddedVariant);
            } else {
                const { data } = await updateVariant({
                    variables: {
                        product: id,
                        input: updateArr,
                        errorPolicy: 'REJECT_FAILED_ROWS',
                    },
                });

                if (data?.productVariantBulkUpdate?.errors?.length > 0) {
                    console.log(' if: ');
                    setUpdateLoading(false);
                    Failure(data?.productVariantBulkUpdate?.errors[0]?.message);
                } else {
                    console.log('else: ');
                    const results = data?.productVariantBulkUpdate?.results || [];

                    if (results.length > 0) {
                        console.log('data?.productVariantBulkUpdate?.results:', results);

                        // Find the first result with errors
                        const firstErrorResult = results.find((result) => result.errors?.length > 0);

                        if (firstErrorResult) {
                            const errorMessage = firstErrorResult.errors[0]?.message;
                            if (errorMessage) {
                                Failure(errorMessage);
                            }
                        } else {
                            console.log('No errors found in results.');
                            if (NewAddedVariant?.length === 0) {
                                updateMetaData();
                            }
                        }
                    } else {
                        console.log('No results found.');
                        if (NewAddedVariant?.length === 0) {
                            updateMetaData();
                        }
                    }
                }
            }
        } catch (error) {
            setUpdateLoading(false);

            console.log('error: ', error);
        }
    };

    const updateMetaData = async () => {
        try {
            const input = [];
            input.push({
                key: 'short_descripton',
                value: shortDescription,
            });
            input.push({
                key: 'description',
                value: description,
            });
            if (label?.value) {
                input.push({
                    key: 'label',
                    value: label.value,
                });
            }
            const { data } = await updateMedatData({
                variables: {
                    id: id,
                    input,
                    // input: [
                    //     {
                    //         key: 'short_descripton',
                    //         value: shortDescription,
                    //     },
                    //     {
                    //         key: 'label',
                    //         value: label.value,
                    //     },
                    //     {
                    //         key: 'description',
                    //         value: description,
                    //     },
                    // ],
                    keysToDelete: [],
                },
                // variables: { email: formData.email, password: formData.password },
            });
            if (data?.updateMetadata?.errors?.length > 0) {
                setUpdateLoading(false);
                Failure(data?.updateMetadata?.errors[0]?.message);
                console.log('error: ', data?.updateMetadata?.errors[0]?.message);
            } else {
                Success('Product updated successfully');
                productDataRefetch();
                setUpdateLoading(false);

                // assignsTagToProduct();
            }
        } catch (error) {
            setUpdateLoading(false);

            console.log('error: ', error);
        }
    };

    const bulkVariantCreate = async (NewAddedVariant: any) => {
        try {
            const variantArr = NewAddedVariant?.map((item: any) => ({
                attributes: [],
                sku: item.sku,
                name: item.name,
                trackInventory: item.stackMgmt,
                channelListings: [
                    {
                        channelId: 'Q2hhbm5lbDoy',
                        price: item.regularPrice,
                        costPrice: item.regularPrice,
                    },
                ],
                stocks: [
                    {
                        warehouse: 'V2FyZWhvdXNlOmRmODMzODUzLTQyMGYtNGRkZi04YzQzLTVkMzdjMzI4MDRlYQ==',
                        quantity: item.stackMgmt ? item.quantity : 0,
                    },
                ],
            }));

            const { data } = await createVariant({
                variables: {
                    id: id,
                    inputs: variantArr,
                },
                // variables: { email: formData.email, password: formData.password },
            });
            console.log('data: ', data);

            if (data?.productVariantBulkCreate?.errors?.length > 0) {
                setUpdateLoading(false);
                Failure(data?.productVariantBulkCreate?.errors[0]?.message);
                console.log('error: ', data?.productChannelListingUpdate?.errors[0]?.message);
            } else {
                const resVariants = data?.productVariantBulkCreate?.productVariants;
                if (resVariants?.length > 0) {
                    resVariants?.map((item: any) => {
                        variantChannelListUpdate(item.id, NewAddedVariant);
                    });
                }
            }
        } catch (error) {
            setUpdateLoading(false);

            console.log('error: ', error);
        }
    };

    const variantChannelListUpdate = async (variantId: any, NewAddedVariant: any) => {
        console.log('variantChannelListUpdate: ');
        try {
            const variantArr = NewAddedVariant?.map((item: any) => ({
                channelId: 'Q2hhbm5lbDoy',
                price: item.regularPrice,
                costPrice: item.regularPrice,
            }));
            console.log('variantArr: ', variantArr);

            const { data } = await updateVariantList({
                variables: {
                    id: variantId,
                    input: variantArr,
                },
                // variables: { email: formData.email, password: formData.password },
            });
            if (data?.productVariantChannelListingUpdate?.errors?.length > 0) {
                setUpdateLoading(false);
                Failure(data?.productVariantChannelListingUpdate?.errors[0]?.message);
                console.log('error: ', data?.productChannelListingUpdate?.errors[0]?.message);
            } else {
                updateMetaData();
            }
        } catch (error) {
            setUpdateLoading(false);

            console.log('error: ', error);
        }
    };

    const assignsTagToProduct = async () => {
        try {
            let tagId: any[] = [];
            // if (selectedCollection?.length > 0) {
            tagId = selectedTag?.map((item: any) => item.value);
            // }
            console.log('tagId: ', tagId);

            const { data } = await assignTagToProduct({
                variables: {
                    id,
                    input: {
                        tags: tagId,
                    },
                },
                // variables: { email: formData.email, password: formData.password },
            });
            if (data?.productUpdate?.errors?.length > 0) {
                console.log('error: ', data?.updateMetadata?.errors[0]?.message);
            } else {
                // router.push('/product/product');
                console.log('success: ', data);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const arr = [
        { type: 'design', designName: dropdowndata?.design },
        { type: 'style', styleName: dropdowndata?.style },
        { type: 'stone', stoneName: dropdowndata?.stoneType },
        { type: 'finish', finishName: dropdowndata?.finish },
        { type: 'stoneColor', stoneColorName: dropdowndata?.stoneColor },
        { type: 'type', typeName: dropdowndata?.type },
        { type: 'size', sizeName: dropdowndata?.size },
    ];

    const optionsVal = arr.map((item) => ({ value: item.type, label: item.type }));

    const handleAddAccordion = () => {
        const selectedType = arr.find((item) => item.type === chooseType);
        setSelectedArr([chooseType, ...selectedArr]);
        setAccordions([selectedType, ...accordions]);
        setOpenAccordion(chooseType);
        setSelectedValues({ ...selectedValues, [chooseType]: [] }); // Clear selected values for the chosen type
    };

    const handleRemoveAccordion = (type: any) => {
        setSelectedArr(selectedArr.filter((item: any) => item !== type));
        setAccordions(accordions.filter((item: any) => item.type !== type));
        setOpenAccordion('');
        const updatedSelectedValues = { ...selectedValues };
        delete updatedSelectedValues[type];
        setSelectedValues(updatedSelectedValues);
    };

    const handleDropdownChange = (event: any, type: any) => {
        setChooseType(type);
    };

    const handleToggleAccordion = (type: any) => {
        setOpenAccordion(openAccordion === type ? '' : type);
    };

    const handleMultiSelectChange = (selectedOptions: any, type: any) => {
        const selectedValuesForType = selectedOptions.map((option: any) => option.value);
        setSelectedValues({ ...selectedValues, [type]: selectedValuesForType });
    };

    const handleChange = (index: any, fieldName: any, fieldValue: any) => {
        setVariants((prevItems) => {
            const updatedItems: any = [...prevItems];
            updatedItems[index][fieldName] = fieldValue;
            return updatedItems;
        });
    };

    const handleAddItem = () => {
        setVariants((prevItems: any) => [
            ...prevItems,
            {
                sku: '',
                stackMgmt: false,
                quantity: 0,
                regularPrice: 0,
                salePrice: 0,
                channelId: '',
            },
        ]);
    };

    const handleRemoveVariants = async (item: any, index: any) => {
        try {
            if (item?.id) {
                const res = await deleteVarient({
                    variables: {
                        id: item?.id,
                    },
                });
            }
            if (index === 0) return; // Prevent removing the first item
            setVariants((prevItems) => prevItems.filter((_, i) => i !== index));
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const handleDragStart = (e: any, id: any, i: any) => {
        console.log('id: ', i);
        e.dataTransfer.setData('id', id);
        setDropIndex(id);
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = async (e: any, targetIndex: any) => {
        e.preventDefault();
        const imageId = e.dataTransfer.getData('id');
        const newIndex = parseInt(targetIndex, 10);
        let draggedImageIndex = -1;
        for (let i = 0; i < images.length; i++) {
            if (images[i].id === dropIndex) {
                draggedImageIndex = i;
                break;
            }
        }

        if (draggedImageIndex !== -1) {
            const newImages = [...images];
            const [draggedImage] = newImages.splice(draggedImageIndex, 1);
            newImages.splice(newIndex, 0, draggedImage);
            setImages(newImages);
            const updatedImg = newImages?.map((item) => item.id);
            const { data } = await mediaReorder({
                variables: {
                    mediaIds: updatedImg,
                    productId: id,
                },
            });
            productDataRefetch();
        }
    };
    // -------------------------------------New Added-------------------------------------------------------

    // const handleSave = async () => {
    //     if (editorInstance) {
    //         try {
    //             const savedContent = await editorInstance.save();
    //             console.log('Editor content:', savedContent);
    //             setContent(JSON.stringify(savedContent, null, 2));
    //             setValue(savedContent);
    //         } catch (error) {
    //             console.error('Failed to save editor content:', error);
    //         }
    //     }
    // };
    // console.log('value', value);
    return (
        <div>
            <div className="  mt-6">
                <div className="panel mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <h5 className="text-lg font-semibold dark:text-white-light">Edit Product</h5>

                    <div className="flex ltr:ml-auto rtl:mr-auto">
                        <button type="button" className="btn btn-primary" onClick={() => router.push('/apps/product/add')}>
                            + Create
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className=" col-span-9">
                        <div className="panel mb-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter Your Name" name="name" className="form-input" required />
                            {productNameErrMsg && <p className="error-message mt-1 text-red-500">{productNameErrMsg}</p>}
                        </div>
                        <div className="panel mb-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Slug
                            </label>
                            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Enter slug" name="name" className="form-input" required />
                            {slugErrMsg && <p className="error-message mt-1 text-red-500 ">{slugErrMsg}</p>}
                        </div>
                        <div className="panel mb-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                SEO
                            </label>
                            <input type="text" value={seoTittle} onChange={(e) => setSeoTittle(e.target.value)} placeholder="Enter title" name="name" className="form-input" required />
                            {seoTittleErrMsg && <p className="error-message mt-1 text-red-500 ">{seoTittleErrMsg}</p>}

                            <textarea
                                id="ctnTextarea"
                                value={seoDesc}
                                onChange={(e) => setSeoDesc(e.target.value)}
                                rows={3}
                                className="form-textarea mt-5"
                                placeholder="Enter Description"
                                required
                            ></textarea>
                            {seoDescErrMsg && <p className="error-message mt-1 text-red-500 ">{seoDescErrMsg}</p>}
                        </div>
                        {/* <div className="panel mb-5">
                            <label htmlFor="editor" className="block text-sm font-medium text-gray-700">
                                Product description
                            </label>
                            <ReactQuill id="editor" theme="snow" value={value} onChange={setValue} />
                        </div> */}
                        <div className="panel mb-5">
                            <label htmlFor="editor" className="block text-sm font-medium text-gray-700">
                                Product description
                            </label>
                            <textarea
                                id="ctnTextarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                className="form-textarea mt-5"
                                placeholder="Enter Description"
                                required
                            ></textarea>
                            {seoDescErrMsg && <p className="error-message mt-1 text-red-500 ">{seoDescErrMsg}</p>}
                            {/* <div ref={editorRef} className="mb-5 border border-gray-200"></div> */}
                        </div>

                        <div className="panel mb-5">
                            <label htmlFor="editor" className="block text-sm font-medium text-gray-700">
                                Product Short description
                            </label>
                            <textarea
                                id="ctnTextarea"
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                rows={3}
                                className="form-textarea"
                                placeholder="Enter Short Description"
                                required
                            ></textarea>
                            {shortDesErrMsg && <p className="error-message mt-1 text-red-500 ">{shortDesErrMsg}</p>}
                        </div>
                        <div className="panel mb-5 ">
                            {/* <div className="mb-5 flex flex-col border-b border-gray-200 pb-5 pl-10 sm:flex-row">
                                <label htmlFor="name" className="mt-2 block  pr-5 text-sm font-semibold text-gray-700">
                                    Product Data
                                </label>
                                <select className="form-select" style={{ width: '200px' }}>
                                    <option value="1">Simple Product</option>
                                    <option value="2">Variable Product</option>
                                </select>
                            </div> */}
                            <div className="flex flex-col  md:flex-row">
                                {isMounted && (
                                    <Tab.Group>
                                        <div className="mx-10 mb-5 sm:mb-0">
                                            <Tab.List className="mb-5 flex w-32 flex-row text-center font-semibold  md:m-auto md:mb-0 md:flex-col ">
                                                {/* <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${selected ? '!bg-primary text-white !outline-none hover:text-white' : ''}
                                                        relative -mb-[1px] block w-full border-white-light p-3.5 py-4 before:absolute before:bottom-0 before:top-0 before:m-auto before:inline-block before:h-0 before:w-[1px] before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:h-[80%] ltr:border-r ltr:before:-right-[1px] rtl:border-l rtl:before:-left-[1px] dark:border-[#191e3a]`}
                                                        >
                                                            General
                                                        </button>
                                                    )}
                                                </Tab> */}

                                                {/* <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${selected ? '!bg-primary text-white !outline-none hover:text-white' : ''}
                                                        relative -mb-[1px] block w-full border-white-light p-3.5 py-4 before:absolute before:bottom-0 before:top-0 before:m-auto before:inline-block before:h-0 before:w-[1px] before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:h-[80%] ltr:border-r ltr:before:-right-[1px] rtl:border-l rtl:before:-left-[1px] dark:border-[#191e3a]`}
                                                        >
                                                            Linked Products
                                                        </button>
                                                    )}
                                                </Tab> */}
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${selected ? '!bg-primary text-white !outline-none hover:text-white' : ''}
                                                        relative -mb-[1px] block w-full border-white-light p-3.5 py-4 before:absolute before:bottom-0 before:top-0 before:m-auto before:inline-block before:h-0 before:w-[1px] before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:h-[80%] dark:border-[#191e3a] ltr:border-r ltr:before:-right-[1px] rtl:border-l rtl:before:-left-[1px]`}
                                                        >
                                                            Attributes
                                                        </button>
                                                    )}
                                                </Tab>
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${selected ? '!bg-primary text-white !outline-none hover:text-white' : ''}
                                                        relative -mb-[1px] block w-full border-white-light p-3.5 py-4 before:absolute before:bottom-0 before:top-0 before:m-auto before:inline-block before:h-0 before:w-[1px] before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:h-[80%] dark:border-[#191e3a] ltr:border-r ltr:before:-right-[1px] rtl:border-l rtl:before:-left-[1px]`}
                                                        >
                                                            Variants
                                                        </button>
                                                    )}
                                                </Tab>
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${selected ? '!bg-primary text-white !outline-none hover:text-white' : ''}
                                                        relative -mb-[1px] block w-full border-white-light p-3.5 py-4 before:absolute before:bottom-0 before:top-0 before:m-auto before:inline-block before:h-0 before:w-[1px] before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:h-[80%] dark:border-[#191e3a] ltr:border-r ltr:before:-right-[1px] rtl:border-l rtl:before:-left-[1px]`}
                                                        >
                                                            Advanced
                                                        </button>
                                                    )}
                                                </Tab>
                                            </Tab.List>
                                        </div>
                                        <Tab.Panels className="w-full">
                                            {/* <Tab.Panel>
                                                <div className="active flex items-center">
                                                    <div className="mb-5 mr-4 pr-6">
                                                        <label htmlFor="upsells" className="block pr-5 text-sm font-medium text-gray-700">
                                                            Upsells
                                                        </label>
                                                    </div>
                                                    <div className="mb-5" style={{ width: '100%' }}>
                                                        <Select placeholder="Select an option" options={options} isMulti isSearchable={true} />
                                                    </div>
                                                </div>

                                                <div className="active flex items-center">
                                                    <div className="mb-5 mr-4">
                                                        <label htmlFor="cross-sells" className="block pr-5 text-sm font-medium text-gray-700">
                                                            Cross-sells
                                                        </label>
                                                    </div>
                                                    <div className="mb-5" style={{ width: '100%' }}>
                                                        <Select placeholder="Select an option" options={options} isMulti isSearchable={false} />
                                                    </div>
                                                </div>
                                            </Tab.Panel> */}

                                            <Tab.Panel>
                                                <div className="active flex items-center">
                                                    <div className="mb-5 pr-3" style={{ width: '50%' }}>
                                                        <Select
                                                            placeholder="Select Type"
                                                            options={optionsVal.filter((option: any) => !selectedArr?.includes(option.value))}
                                                            onChange={(selectedOption: any) => handleDropdownChange(selectedOption, selectedOption.value)}
                                                            value={options?.find((option) => option?.value === chooseType)} // Set the value of the selected type
                                                        />
                                                    </div>
                                                    <div className="mb-5">
                                                        <button type="button" className="btn btn-outline-primary" onClick={handleAddAccordion}>
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mb-5">
                                                    <div className="space-y-2 font-semibold">
                                                        {accordions.map((item: any) => (
                                                            <div key={item?.type} className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                                                                <button
                                                                    type="button"
                                                                    className={`flex w-full items-center p-4 text-white-dark dark:bg-[#1b2e4b] ${active === '1' ? '!text-primary' : ''}`}
                                                                    // onClick={() => togglePara('1')}
                                                                >
                                                                    {item?.type}
                                                                    {/* <button onClick={() => handleRemoveAccordion(item.type)}>Remove</button> */}

                                                                    <div className={`text-red-400 ltr:ml-auto rtl:mr-auto `} onClick={() => handleRemoveAccordion(item.type)}>
                                                                        <IconTrashLines />
                                                                    </div>
                                                                </button>
                                                                <div>
                                                                    <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                                                                        <div className="grid grid-cols-12 gap-4 border-t border-[#d3d3d3] p-4 text-[13px] dark:border-[#1b2e4b]">
                                                                            <div className="col-span-4">
                                                                                <p>
                                                                                    Name:
                                                                                    <br /> <span className="font-semibold">{item.type}</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="col-span-8">
                                                                                <div className="active ">
                                                                                    <div className=" mr-4 ">
                                                                                        <label htmlFor="value" className="block pr-5 text-sm font-medium text-gray-700">
                                                                                            Value(s)
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="mb-5" style={{ width: '100%' }}>
                                                                                        {/* <Select
                                                                                            placeholder={`Select ${item.type} Name`}
                                                                                            options={item[`${item.type}Name`]}
                                                                                            onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, item.type)}
                                                                                            isMulti
                                                                                            isSearchable={false}
                                                                                            value={(selectedValues[item.type] || []).map((value) => ({ value, label: value }))}
                                                                                        /> */}
                                                                                        <Select
                                                                                            placeholder={`Select ${item.type} Name`}
                                                                                            options={item[`${item.type}Name`]}
                                                                                            onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, item.type)}
                                                                                            isMulti
                                                                                            isSearchable={true}
                                                                                            value={(selectedValues[item.type] || []).map((value: any) => {
                                                                                                const options = item[`${item.type}Name`];
                                                                                                const option = options ? options.find((option: any) => option.value === value) : null;
                                                                                                return option ? { value: option.value, label: option.label } : null;
                                                                                            })}
                                                                                        />
                                                                                        {attributeError[item.type] && <p className="error-message mt-1 text-red-500">{attributeError[item.type]}</p>}

                                                                                        {/* <Select placeholder="Select an option" options={options} isMulti isSearchable={false} /> */}
                                                                                        {/* <div className="flex justify-between">
                                                                                        <div className="flex">
                                                                                            <button type="button" className="btn btn-outline-primary btn-sm mr-2 mt-1">
                                                                                                Select All
                                                                                            </button>
                                                                                            <button type="button" className="btn btn-outline-primary btn-sm mt-1">
                                                                                                Select None
                                                                                            </button>
                                                                                        </div>
                                                                                        <div>
                                                                                            <button type="button" className="btn btn-outline-primary btn-sm mt-1">
                                                                                                Create Value
                                                                                            </button>
                                                                                        </div>
                                                                                    </div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </AnimateHeight>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* <div>
                                                    <button type="button" className="btn btn-primary">
                                                        Save Attributes
                                                    </button>
                                                </div> */}
                                            </Tab.Panel>

                                            <Tab.Panel>
                                                {variants?.map((item, index) => {
                                                    return (
                                                        <div key={index} className="mb-5 border-b border-gray-200">
                                                            {index !== 0 && ( // Render remove button only for items after the first one
                                                                <div className="active flex items-center justify-end text-danger">
                                                                    <button onClick={() => handleRemoveVariants(item, index)}>
                                                                        <IconTrashLines />
                                                                    </button>
                                                                </div>
                                                            )}
                                                            <div className="active flex items-center">
                                                                <div className="mb-5 mr-4" style={{ width: '20%' }}>
                                                                    <label htmlFor={`name${index}`} className="block pr-5 text-sm font-medium text-gray-700">
                                                                        Variant
                                                                    </label>
                                                                </div>
                                                                <div className="mb-5" style={{ width: '80%' }}>
                                                                    <input
                                                                        type="text"
                                                                        id={`name${index}`}
                                                                        name={`name${index}`}
                                                                        value={item.name}
                                                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Enter variants"
                                                                        className="form-input"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="active flex items-center">
                                                                <div className="mb-5 mr-4" style={{ width: '20%' }}>
                                                                    <label htmlFor={`sku_${index}`} className="block pr-5 text-sm font-medium text-gray-700">
                                                                        SKU
                                                                    </label>
                                                                </div>
                                                                <div className="mb-5" style={{ width: '80%' }}>
                                                                    <input
                                                                        type="text"
                                                                        id={`sku_${index}`}
                                                                        name={`sku_${index}`}
                                                                        value={item.sku}
                                                                        onChange={(e) => handleChange(index, 'sku', e.target.value)}
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Enter SKU"
                                                                        className="form-input"
                                                                    />
                                                                    {variantErrors[index]?.sku && <p className="error-message mt-1 text-red-500">{variantErrors[index].sku}</p>}

                                                                    {/* {skuErrMsg && <p className="error-message mt-1 text-red-500 ">{skuErrMsg}</p>} */}
                                                                </div>
                                                            </div>
                                                            <div className="active flex items-center">
                                                                <div className="mb-5 mr-4 pr-4" style={{ width: '20%' }}>
                                                                    <label htmlFor={`stackMgmt_${index}`} className="block  text-sm font-medium text-gray-700">
                                                                        Stock Management
                                                                    </label>
                                                                </div>
                                                                <div className="mb-5" style={{ width: '80%' }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`stackMgmt_${index}`}
                                                                        name={`stackMgmt_${index}`}
                                                                        checked={item.stackMgmt}
                                                                        onChange={(e) => handleChange(index, 'stackMgmt', e.target.checked)}
                                                                        className="form-checkbox"
                                                                    />
                                                                    <span>Track stock quantity for this product</span>
                                                                    {variantErrors[index]?.stackMgmt && <p className="error-message mt-1 text-red-500">{variantErrors[index].stackMgmt}</p>}
                                                                </div>
                                                            </div>
                                                            {item.stackMgmt && (
                                                                <div className="active flex items-center">
                                                                    <div className="mb-5 mr-4 " style={{ width: '20%' }}>
                                                                        <label htmlFor={`quantity_${index}`} className="block  text-sm font-medium text-gray-700">
                                                                            Quantity
                                                                        </label>
                                                                    </div>
                                                                    <div className="mb-5" style={{ width: '80%' }}>
                                                                        <input
                                                                            type="number"
                                                                            id={`quantity_${index}`}
                                                                            name={`quantity_${index}`}
                                                                            value={item?.quantity}
                                                                            onChange={(e) => handleChange(index, 'quantity', parseInt(e.target.value))}
                                                                            style={{ width: '100%' }}
                                                                            placeholder="Enter Quantity"
                                                                            className="form-input"
                                                                        />
                                                                        {variantErrors[index]?.quantity && <p className="error-message mt-1 text-red-500">{variantErrors[index].quantity}</p>}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="active flex items-center">
                                                                <div className="mb-5 mr-4" style={{ width: '20%' }}>
                                                                    <label htmlFor={`regularPrice_${index}`} className="block pr-5 text-sm font-medium text-gray-700">
                                                                        Regular Price
                                                                    </label>
                                                                </div>
                                                                <div className="mb-5" style={{ width: '80%' }}>
                                                                    <input
                                                                        type="number"
                                                                        id={`regularPrice_${index}`}
                                                                        name={`regularPrice_${index}`}
                                                                        value={item.regularPrice}
                                                                        onChange={(e) => handleChange(index, 'regularPrice', parseFloat(e.target.value))}
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Enter Regular Price"
                                                                        className="form-input"
                                                                    />
                                                                    {variantErrors[index]?.regularPrice && <p className="error-message mt-1 text-red-500">{variantErrors[index].regularPrice}</p>}
                                                                </div>
                                                            </div>
                                                            {/* <div className="flex items-center">
                                                                <div className="mb-5 mr-4" style={{ width: '20%' }}>
                                                                    <label htmlFor={`salePrice_${index}`} className="block pr-10 text-sm font-medium text-gray-700">
                                                                        Sale Price
                                                                    </label>
                                                                </div>
                                                                <div className="mb-5" style={{ width: '80%' }}>
                                                                    <input
                                                                        type="number"
                                                                        id={`salePrice_${index}`}
                                                                        name={`salePrice_${index}`}
                                                                        value={item.salePrice}
                                                                        onChange={(e) => handleChange(index, 'salePrice', parseFloat(e.target.value))}
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Enter Sale Price"
                                                                        className="form-input"
                                                                    />
                                                                    {variantErrors[index]?.salePrice && <p className="error-message mt-1 text-red-500">{variantErrors[index].salePrice}</p>}

                                                                    {salePriceErrMsg && <p className="error-message mt-1 text-red-500 ">{salePriceErrMsg}</p>}
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    );
                                                })}
                                                <div className="mb-5">
                                                    <button type="button" className=" btn btn-primary flex justify-end" onClick={handleAddItem}>
                                                        Add item
                                                    </button>
                                                </div>

                                                {/* <div>
                                                    <div className="flex items-center">
                                                        <div className="mb-5 mr-4">
                                                            <label htmlFor="tax-status" className="block pr-8 text-sm font-medium text-gray-700">
                                                                Tax Status
                                                            </label>
                                                        </div>
                                                        <div className="mb-5">
                                                            <select className="form-select w-52 flex-1" style={{ width: '100%' }} onChange={(e) => taxStatus(e.target.value)}>
                                                                <option value="taxable">Taxable</option>
                                                                <option value="shipping-only">Shipping Only</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="mb-5 mr-4">
                                                            <label htmlFor="tax-status" className="block pr-10 text-sm font-medium text-gray-700">
                                                                Tax Class
                                                            </label>
                                                        </div>
                                                        <div className="mb-5">
                                                            <select className="form-select w-52 flex-1" style={{ width: '100%' }} onChange={(e) => taxClass(e.target.value)}>
                                                                <option value="standard">Standard</option>
                                                                <option value="reduced-rate">Reduced rate</option>
                                                                <option value="zero-rate">Zero rate</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </Tab.Panel>

                                            <Tab.Panel>
                                                <div>
                                                    <div className="active flex items-center">
                                                        <div className="mb-5 mr-4 pr-3" style={{ width: '20%' }}>
                                                            <label htmlFor="regularPrice" className="block pr-5 text-sm font-medium text-gray-700">
                                                                Menu Order
                                                            </label>
                                                        </div>
                                                        <div className="mb-5" style={{ width: '80%' }}>
                                                            <input
                                                                type="number"
                                                                style={{ width: '100%' }}
                                                                value={menuOrder}
                                                                onChange={(e: any) => setMenuOrder(e.target.value)}
                                                                placeholder="Enter Menu Order"
                                                                name="regularPrice"
                                                                className="form-input"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Panel>

                                            <Tab.Panel>
                                                <div className="active flex items-center">
                                                    <div className="mb-20 mr-4">
                                                        <label htmlFor="regularPrice" className="block pr-5 text-sm font-medium text-gray-700">
                                                            Purchase note
                                                        </label>
                                                    </div>
                                                    <div className="mb-5">
                                                        <textarea rows={3} style={{ width: '100%' }} placeholder="Enter Regular Price" name="regularPrice" className="form-input" required />
                                                    </div>
                                                </div>

                                                <div className="active flex items-center border-t border-gray-200 pt-5">
                                                    <div className="mb-5 mr-4 pr-3">
                                                        <label htmlFor="regularPrice" className="block pr-5 text-sm font-medium text-gray-700">
                                                            Menu Order
                                                        </label>
                                                    </div>
                                                    <div className="mb-5">
                                                        <input type="number" style={{ width: '100%' }} placeholder="Enter Regular Price" name="regularPrice" className="form-input" required />
                                                    </div>
                                                </div>

                                                <div className="active flex items-center border-t border-gray-200 pt-5">
                                                    <div className="mb-5 mr-4 pr-3">
                                                        <label htmlFor="review" className="block  text-sm font-medium text-gray-700">
                                                            Enable reviews
                                                        </label>
                                                    </div>
                                                    <div className="mb-5">
                                                        <input type="checkbox" className="form-checkbox" defaultChecked />
                                                    </div>
                                                </div>
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                )}
                            </div>
                        </div>
                        <div className="panel mt-5">
                            <div className="mb-5 border-b border-gray-200 pb-2">
                                <h5 className=" block text-lg font-medium text-gray-700">Collections</h5>
                            </div>
                            <div className="mb-5">
                                <Select placeholder="Select an collection" options={collectionList} value={selectedCollection} onChange={selectedCollections} isMulti isSearchable={true} />
                            </div>
                        </div>
                        <div className="panel mt-5">
                            <div className="mb-5 border-b border-gray-200 pb-2">
                                <h5 className=" block text-lg font-medium text-gray-700">Label</h5>
                            </div>
                            <div className="mb-5">
                                <Select placeholder="Select an label" options={options} value={label} onChange={(val) => setLabel(val)} isSearchable={true} />
                            </div>
                        </div>

                        {/* <div className="panel mb-5">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-6">
                                    <h5 className="un mb-5 block text-lg font-medium text-gray-700 underline">Permanent "New" label</h5>
                                    <label className="relative h-6 w-12">
                                        <input type="checkbox" className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0" id="custom_switch_checkbox1" />
                                        <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
                                    </label>
                                    <p className="mt-2 text-sm text-gray-500">Enable this option to make your product have "New" status forever.</p>
                                </div>
                                <div className="col-span-6">
                                    <h5 className="un mb-5 block text-lg font-medium text-gray-700 underline">Mark product as "New" till date</h5>
                                    <div>
                                        <input type="date" style={{ width: '100%' }} placeholder="From.." name="new-label" className="form-input" required />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Specify the end date when the "New" status will be retired. NOTE: "Permanent "New" label" option should be disabled if you use the exact date.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-span-3">
                        <div className="panel">
                            <div className="mb-5 border-b border-gray-200 pb-2">
                                <h5 className=" block text-lg font-medium text-gray-700">Publish</h5>
                            </div>

                            {/* <p className="mb-5">
                                Status: <span className="font-bold">Published</span>{' '}
                                <span className="ml-2 cursor-pointer text-primary underline" onClick={() => statusEditClick()}>
                                    {statusVisible ? 'Cancel' : 'Edit'}
                                </span>
                            </p> */}

                            <div className="active flex items-center">
                                <div className="mb-5 w-full pr-3">
                                    <select className="form-select  flex-1 " value={publish} onChange={(e) => setPublish(e.target.value)}>
                                        <option value="published">Published</option>
                                        {/* <option value="pending-reviews">Pending Reviews</option> */}
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                                {/* <div className="mb-5">
                                            <button type="button" className="btn btn-outline-primary">
                                                Ok
                                            </button>
                                        </div> */}
                            </div>

                            {/* <p className="mb-5">
                                Visibility: <span className="font-bold">Public</span>{' '}
                                <span className="ml-2 cursor-pointer text-primary underline" onClick={() => PublicEditClick()}>
                                    {publicVisible ? 'Cancel' : 'Edit'}
                                </span>
                            </p>

                            {publicVisible ? (
                                <>
                                    <div className="active ">
                                        <div className="mb-5">
                                            <div className="pb-5">
                                                <input type="radio" name="default_radio" className="form-radio" defaultChecked />
                                                <span>Public</span>
                                            </div>
                                            <div className="pb-5">
                                                <input type="radio" name="default_radio" className="form-radio" />
                                                <span>Password protected</span>
                                            </div>
                                            <div>
                                                <input type="radio" name="default_radio" className="form-radio" />
                                                <span>Private</span>
                                            </div>
                                        </div>
                                        <div className="mb-5 flex justify-start">
                                            <button type="button" className="btn btn-outline-primary mr-2" onClick={() => setPublicVisible(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary">
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : null} */}

                            {/* <p className="mb-5">
                                Published on: <span className="font-bold">May 19, 2023 at 17:53</span>{' '}
                                <span className="ml-2 cursor-pointer text-primary underline" onClick={() => PublishedDateClick()}>
                                    {publishedDate ? 'Cancel' : 'Edit'}
                                </span>
                            </p>

                            {publishedDate ? (
                                <>
                                    <div className="active flex items-center">
                                        <div className="mb-5 pr-3">
                                            <input type="datetime-local" placeholder="From.." name="new-label" className="form-input" required />
                                        </div>
                                        <div className="mb-5">
                                            <button type="button" className="btn btn-outline-primary">
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : null} */}
                            {/* <p className="mb-5">
                                Catalog visibility: <span className="font-bold">Shop and search results</span>{' '}
                                <span className="ml-2 cursor-pointer text-primary underline" onClick={() => CatalogEditClick()}>
                                    {catalogVisible ? 'Cancel' : 'Edit'}
                                </span>
                            </p> */}

                            {/* {catalogVisible ? (
                                <>
                                    <div className="active">
                                        <p className="mb-2 text-sm text-gray-500">This setting determines which shop pages products will be listed on.</p>
                                        <div className="mb-5">
                                            <div className="pb-3">
                                                <input type="radio" name="default_radio" className="form-radio" defaultChecked />
                                                <span>Shop and search results</span>
                                            </div>
                                            <div className="pb-3">
                                                <input type="radio" name="default_radio" className="form-radio" />
                                                <span>Shop only</span>
                                            </div>
                                            <div className="pb-3">
                                                <input type="radio" name="default_radio" className="form-radio" />
                                                <span>Search results only</span>
                                            </div>

                                            <div className="pb-3">
                                                <input type="radio" name="default_radio" className="form-radio" />
                                                <span>Hidden</span>
                                            </div>
                                        </div>
                                        <div className="pb-3">
                                            <input type="checkbox" className="form-checkbox" />
                                            <span>This is a featured product</span>
                                        </div>
                                        <div className="mb-5 flex justify-start">
                                            <button type="button" className="btn btn-outline-primary mr-2" onClick={() => setCatalogVisible(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary">
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : null} */}

                            <button type="submit" className="btn btn-primary w-full" onClick={() => updateProducts()}>
                                {updateLoading ? <IconLoader /> : 'Update'}
                            </button>
                        </div>

                        {/* <div className="panel mt-5">
                            <div className="mb-5 border-b border-gray-200 pb-2">
                                <h5 className=" block text-lg font-medium text-gray-700">Product Image</h5>
                            </div>
                            <div onClick={() => productImagePopup()}>
                                <img src="https://via.placeholder.com/200x300" alt="Product image" className="h-60 object-cover" />
                            </div>
                            <div
                                onClick={() => productImagePopup()}
                                className="cursor-pointer"
                                title="Upload Images"
                            >
                                {thumbnail == '' || null ? (
                                    <img src="https://via.placeholder.com/200x300" alt="Product image" className="h-60 object-cover" />
                                ) : (
                                    <img src={thumbnail} alt="Product image" className="h-60 object-cover" />
                                )}
                            </div>
                            <p className="mt-5 text-sm text-gray-500">Click the image to edit or update</p>
                            {thumbnail && (
                                <p className="mt-2 cursor-pointer text-danger underline" onClick={handleDelete}>
                                    Remove product image
                                </p>
                            )}
                            <div className="flex justify-end">
                                <button className="btn btn-primary mt-5" onClick={uploadImage}>
                                    Upload
                                </button>
                            </div>
                            <p className="mt-5 cursor-pointer text-danger underline">Remove product image</p>
                        </div> */}

                        <div className="panel mt-5">
                            <div className="mb-5 border-b border-gray-200 pb-2">
                                <h5 className=" block text-lg font-medium text-gray-700">Product Gallery</h5>
                            </div>

                            <div className="grid grid-cols-12 gap-3">
                                {/* {images?.length > 0 && */}
                                {images?.length > 0 &&
                                    images?.map((item: any, index: any) => (
                                        <>
                                            {/* <div className=" relative h-10 w-10  flex"> */}

                                            <div
                                                key={item.id}
                                                className="h-15 w-15 relative col-span-4 overflow-hidden bg-black"
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, item.id, index)}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDrop(e, index)}
                                                // style={{ width: '33.33%', padding: '5px' }}
                                            >
                                                <img src={item?.url} alt="Selected" className=" h-full w-full overflow-auto object-contain" />

                                                {/* Delete icon */}

                                                <button className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white" onClick={() => multiImageDelete(item)}>
                                                    <IconTrashLines />
                                                </button>
                                            </div>
                                            {/* </div> */}
                                        </>
                                    ))}

                                {/* <div className="grid grid-cols-12 gap-3">
                                    {imageUrl?.length > 0 &&
                                        imageUrl?.map((item, index) => (
                                            <div className="relative col-span-4">
                                                <img src={item} alt="Product image" className=" object-cover" />
                                                <button className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white">
                                                    <IconTrashLines className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))} */}

                                {/* <div className="col-span-4">
                                            <img src="https://via.placeholder.com/100x100" alt="Product image" className=" object-cover" />
                                        </div> */}
                                {/* </div> */}
                            </div>

                            <p className="mt-5 cursor-pointer text-primary underline" onClick={() => setModal4(true)}>
                                Add product gallery images
                            </p>
                            {/* <button type="button" className="btn btn-primary mt-5" onClick={() => productVideoPopup()}>
                                + Video
                            </button> */}
                        </div>

                        <div className="panel mt-5">
                            <div className="mb-5 border-b border-gray-200 pb-2">
                                <h5 className=" block text-lg font-medium text-gray-700">Product Categories</h5>
                            </div>
                            <div className="mb-5">
                                <Select placeholder="Select an category" options={categoryList} value={selectedCat} onChange={selectCat} isSearchable={true} />
                                {categoryErrMsg && <p className="error-message mt-1 text-red-500 ">{categoryErrMsg}</p>}
                            </div>
                            {/* <div className="mb-5">
                                {isMounted && (
                                    <Tab.Group>
                                        <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={`${selected ? '!border-white-light !border-b-white text-danger dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                -mb-[1px] flex items-center border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-danger`}
                                                    >
                                                        All Categories
                                                    </button>
                                                )}
                                            </Tab>
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={`${selected ? '!border-white-light !border-b-white text-danger dark:!border-[#191e3a] dark:!border-b-black' : ''}
                                                -mb-[1px] flex items-center border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-danger`}
                                                    >
                                                        Most Used
                                                    </button>
                                                )}
                                            </Tab>
                                        </Tab.List>
                                        <Tab.Panels className="flex-1 border border-t-0 border-white-light p-4 text-sm  dark:border-[#191e3a]">
                                            <Tab.Panel>
                                                <div className="active">
                                                    <div className="pb-3">
                                                        <input type="checkbox" className="form-checkbox" />
                                                        <span>Anklets</span>
                                                    </div>

                                                    <div className="pb-3 pl-5">
                                                        <input type="checkbox" className="form-checkbox" />
                                                        <span>Kada</span>
                                                    </div>

                                                    <div className="pb-3 pl-5">
                                                        <input type="checkbox" className="form-checkbox" />
                                                        <span>Rope Anklet</span>
                                                    </div>

                                                    <div className="pb-3">
                                                        <input type="checkbox" className="form-checkbox" />
                                                        <span>Bangles & Bracelets</span>
                                                    </div>
                                                </div>
                                            </Tab.Panel>
                                            <Tab.Panel>
                                                <div className="active">
                                                    <div className="pb-3">
                                                        <input type="checkbox" className="form-checkbox" />
                                                        <span>Anklets</span>
                                                    </div>

                                                    <div className="pb-3">
                                                        <input type="checkbox" className="form-checkbox" />
                                                        <span>Kada</span>
                                                    </div>

                                                    <div className="pb-3">
                                                        <input type="checkbox" className="form-checkbox" />
                                                        <span>Rope Anklet</span>
                                                    </div>
                                                </div>
                                            </Tab.Panel>

                                            <Tab.Panel>Disabled</Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                )}
                            </div> */}
                            {/* <p className="cursor-pointer text-primary underline" onClick={() => addCategoryClick()}>
                                {addCategory ? 'Cancel' : '+ Add New Category'}
                            </p>
                            {addCategory && (
                                <>
                                    <div>
                                        <input type="text" className="form-input mt-3" placeholder="Category Name" />
                                        <select name="parent-category" id="parent-category" className="form-select mt-3">
                                            <option>Anklets</option>
                                            <option>__Black Thread</option>
                                            <option>__Kada</option>
                                        </select>
                                        <button type="button" className="btn btn-primary mt-3">
                                            Add New Category
                                        </button>
                                    </div>
                                </>
                            )} */}
                        </div>

                        <div className="panel mt-5">
                            <div className="mb-5 border-b border-gray-200 pb-2">
                                <h5 className=" block text-lg font-medium text-gray-700">Product Tags</h5>
                            </div>
                            <div className="mb-5">
                                <Select placeholder="Select an tags" isMulti options={tagList} value={selectedTag} onChange={(data: any) => setSelectedTag(data)} isSearchable={true} />
                            </div>
                            {/* <div className="mb-5 flex">
                                <input type="text" className="form-input mr-3 mt-3" placeholder="Product Tags" />
                                <button type="button" className="btn btn-primary mt-3">
                                    Add
                                </button>
                            </div> */}
                            {/* <div>
                                <p className="mb-5 text-sm text-gray-500">Separate tags with commas</p>
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-1">
                                        <IconX className="h-4 w-4 rounded-full border border-danger" />
                                        <p> 925 silver jewellery</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <IconX className="h-4 w-4 rounded-full border border-danger" />
                                        <p>Chennai</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <IconX className="h-4 w-4 rounded-full border border-danger" />
                                        <p>jewels prade</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <IconX className="h-4 w-4 rounded-full border border-danger" />
                                        <p>Kundan Earrings</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <IconX className="h-4 w-4 rounded-full border border-danger" />
                                        <p>prade love</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Transition appear show={modal2} as={Fragment}>
                <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel max-w-8xl my-8 w-full overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">Product Image</h5>
                                        <button onClick={() => setModal2(false)} type="button" className="text-white-dark hover:text-dark">
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="m-5">
                                        {isMounted && (
                                            <Tab.Group>
                                                <Tab.List className="mt-3 flex flex-wrap gap-2 border-b border-gray-200 pb-5">
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                                                    -mb-[1px] flex items-center rounded p-3.5 py-2 before:inline-block hover:bg-primary hover:text-white`}
                                                            >
                                                                Upload Files
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                                                    -mb-[1px] flex items-center rounded p-3.5 py-2 before:inline-block hover:bg-primary hover:text-white`}
                                                            >
                                                                Media Library
                                                            </button>
                                                        )}
                                                    </Tab>
                                                </Tab.List>
                                                <Tab.Panels>
                                                    <Tab.Panel>
                                                        <div className="active  pt-5">
                                                            <div className="flex h-[500px] items-center justify-center">
                                                                <div className="w-1/2 text-center">
                                                                    <h3 className="mb-2 text-xl font-semibold">Drag and drop files to upload</h3>
                                                                    <p className="mb-2 text-sm ">or</p>
                                                                    <input type="file" className="mb-2 ml-32" />
                                                                    <p className="mb-2 text-sm">Maximum upload file size: 30 MB.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>

                                                    <Tab.Panel>
                                                        <div className="grid grid-cols-12 pt-5">
                                                            <div className="col-span-9 h-[450px] overflow-y-scroll border-r border-gray-200 pr-5">
                                                                <div>
                                                                    <div>Filter mediaFilter by type</div>
                                                                </div>
                                                                <div className="flex justify-between gap-3 pt-3">
                                                                    <div className="flex gap-3">
                                                                        {/* <select className="form-select flex-1">
                                                                            <option value=""> </option>
                                                                            <option value="Anklets">Anklets</option>
                                                                            <option value="Earings">Earings</option>
                                                                            <option value="Palakka">Palakka</option>
                                                                        </select>{' '} */}
                                                                        <select className="form-select w-40 flex-1">
                                                                            <option value="">All Datas </option>
                                                                            <option value="June2023">June2023</option>
                                                                            <option value="july2023">july2023</option>
                                                                            <option value="aug2023">aug2023</option>
                                                                        </select>
                                                                    </div>
                                                                    <div>
                                                                        <input
                                                                            type="text"
                                                                            className="form-input mr-2 w-auto"
                                                                            placeholder="Search..."
                                                                            // value={search}
                                                                            // onChange={(e) => setSearch(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-12 gap-3 pt-5">
                                                                    <div className="col-span-2">
                                                                        <img src="https://via.placeholder.com/150x150" alt="" />
                                                                    </div>

                                                                    <div className="col-span-2">
                                                                        <img src="https://via.placeholder.com/150x150" alt="" />
                                                                    </div>

                                                                    <div className="col-span-2">
                                                                        <img src="https://via.placeholder.com/150x150" alt="" />
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <img src="https://via.placeholder.com/150x150" alt="" />
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <img src="https://via.placeholder.com/150x150" alt="" />
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <img src="https://via.placeholder.com/150x150" alt="" />
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <img src="https://via.placeholder.com/150x150" alt="" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-center pt-5">
                                                                    <div className=" text-center">
                                                                        <p>Showing 80 of 2484 media items</p>
                                                                        <div className="flex justify-center">
                                                                            <button className="btn btn-primary mt-2">Load more</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-3 h-[450px] overflow-y-scroll pl-5">
                                                                <div className="border-b border-gray-200 pb-5">
                                                                    <div>
                                                                        <p className="mb-2 text-lg font-semibold">ATTACHMENT DETAILS</p>
                                                                    </div>
                                                                    <div>
                                                                        <img src="https://via.placeholder.com/250x300" alt="" />
                                                                    </div>
                                                                    <p className="mt-2 font-semibold">PraDeJewels_Necklace_Yazhu-scaled-2.jpg</p>
                                                                    <p className="text-sm">May 19, 2023</p>
                                                                    <p className="text-sm">619 KB</p>
                                                                    <p className="text-sm">1707 by 2560 pixels</p>
                                                                    <a href="#" className="text-danger underline">
                                                                        Delete permanently
                                                                    </a>
                                                                </div>
                                                                <div className="pr-5">
                                                                    <div className="mt-5">
                                                                        <label className="mb-2">Alt Text</label>
                                                                        <textarea className="form-input" placeholder="Enter Alt Text"></textarea>
                                                                        <span>
                                                                            <a href="#" className="text-primary underline">
                                                                                Learn how to describe the purpose of the image
                                                                            </a>
                                                                            . Leave empty if the image is purely decorative.
                                                                        </span>
                                                                    </div>
                                                                    <div className="mt-5">
                                                                        <label className="mb-2">Title</label>
                                                                        <input type="text" className="form-input" placeholder="Enter Title" />
                                                                    </div>

                                                                    <div className="mt-5">
                                                                        <label className="mb-2">Caption</label>
                                                                        <textarea className="form-input" placeholder="Enter Caption"></textarea>
                                                                    </div>

                                                                    <div className="mt-5">
                                                                        <label className="mb-2">File URL</label>
                                                                        <input type="text" className="form-input" placeholder="Enter Title" />
                                                                        <button className="btn btn-primary-outline mt-2 text-sm">Copy URL to Clipboard</button>
                                                                    </div>
                                                                    <div className="mt-5">
                                                                        <p>Required fields are marked *</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 flex justify-end border-t border-gray-200 pt-5">
                                                            <button className="btn btn-primary">Set Product Image</button>
                                                        </div>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </Tab.Group>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* product video popup */}
            <Transition appear show={modal1} as={Fragment}>
                <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <div className="text-lg font-bold">Product gallery video</div>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal1(false)}>
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="m-5">
                                        {isMounted && (
                                            <Tab.Group>
                                                <Tab.List className="mt-3 flex w-44 flex-wrap justify-start space-x-2 border p-1  rtl:space-x-reverse">
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                                                    ' -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white`}
                                                            >
                                                                MP4
                                                            </button>
                                                        )}
                                                    </Tab>
                                                    <Tab as={Fragment}>
                                                        {({ selected }) => (
                                                            <button
                                                                className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                                                    ' -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white`}
                                                            >
                                                                Youtube
                                                            </button>
                                                        )}
                                                    </Tab>
                                                </Tab.List>
                                                <Tab.Panels>
                                                    <Tab.Panel>
                                                        <div className="active pt-5">
                                                            <label htmlFor="product-gallery-video" className="form-label mb-5 border-b  pb-3 text-gray-600">
                                                                MP4 video file
                                                            </label>
                                                            <input type="file" id="product-gallery-video" className="form-input" />
                                                            <span className="pt-5 text-sm text-gray-600">Upload a new or select (.mp4) video file from the media library.</span>
                                                        </div>
                                                        <button className="btn btn-primary mt-5">Save</button>
                                                    </Tab.Panel>
                                                    <Tab.Panel>
                                                        <div className="active pt-5">
                                                            <label htmlFor="product-gallery-video" className="form-label mb-5 border-b  pb-3 text-gray-600">
                                                                YouTube video URL
                                                            </label>
                                                            <input type="text" id="product-gallery-video" className="form-input" />
                                                            <span className="pt-5 text-sm text-gray-600">Example: https://youtu.be/LXb3EKWsInQ</span>
                                                        </div>
                                                        <button className="btn btn-primary mt-5">Save</button>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </Tab.Group>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* product img popup */}

            <Transition appear show={modal4} as={Fragment}>
                <Dialog as="div" open={modal4} onClose={() => setModal4(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between border-b bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <div className="text-lg font-bold">Product gallery Image</div>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal4(false)}>
                                            <IconX />
                                        </button>
                                    </div>
                                    <div className="m-5 pt-5">
                                        {/* Input for selecting file */}
                                        <input type="file" id="product-gallery-image" className="form-input" onChange={multiImgUpload} />

                                        {/* Button to upload */}
                                        {/* <div className="flex justify-end">
                                            <button className="btn btn-primary mt-5" onClick={handleUpload}>
                                                Upload
                                            </button>
                                        </div> */}

                                        {/* Display preview of the selected image */}
                                        {/* {images?.length > 0 &&
                                            images?.map((item, index) => (
                                                <div className="mt-5 bg-[#f0f0f0] p-5">

                                                    <div
                                                        key={item.id}
                                                        className=" relative h-20 w-20 "
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, item.id)}
                                                        onDragOver={handleDragOver}
                                                        onDrop={(e) => handleDrop(e, index)}
                                                    >
                                                        <img src={item?.url} alt="Selected" className="h-full w-full object-cover " />


                                                        <button className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white" onClick={() => multiImageDelete(index)}>
                                                            <IconTrashLines />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))} */}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default PrivateRouter(ProductEdit);
