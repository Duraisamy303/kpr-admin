import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { API, Failure, Success, parseHTMLContent, showDeleteAlert, transformData, useSetState } from '@/utils/functions';
import { DataTable } from 'mantine-datatable';
import Tippy from '@tippyjs/react';
import IconPencil from '@/components/Icon/IconPencil';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Modal from '@/components/Modal';
import IconLoader from '@/components/Icon/IconLoader';
import IconX from '@/components/Icon/IconX';
import Image from 'next/image';
import pdf from '../public/assets/images/pdf.png';
import IconTrash from '@/components/Icon/IconTrash';
import IconEye from '@/components/Icon/IconEye';
import Select from 'react-select';
import Swal from 'sweetalert2';
import PrivateRouter from '@/components/Layouts/PrivateRouter';

const ShareHoldingPattern=()=> {
    const [state, setState] = useSetState({
        isOpen: false,
        files: [{ subtitle: '', file: null }],
        yearSection: '',
        errorMessage: '',
        name: '',
        yearError: '',
        nameError: '',
        loading: false,
        parsedData: [],
        page: 1,
        PAGE_SIZES: [10, 20, 30, 50, 100],
        pageSize: 10,
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setState({ loading: true });
            const res = await axios.get('https://file.kprmilllimited.com/wp-json/custom-api/v1/cfdb-submissions');
            const separatedData = res?.data.reduce((acc, obj) => {
                const formPostId = obj.form_post_id;
                if (!acc[formPostId]) {
                    acc[formPostId] = [];
                }
                acc[formPostId].push(obj);
                return acc;
            }, {});

            const datas = separatedData['3759'];
            const tableData =
                datas?.map((item) => ({
                    title: item.form_value?.title,
                    link: transformData(item.form_value),
                    id: item?.id,
                    year: item?.form_value?.yearselection[0],
                })) || [];

            setState({ parsedData: tableData, loading: false });
        } catch (error) {
            setState({ loading: false });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ loading: true });
        if (state.name == '') {
            setState({ nameError: 'Please enter title ', loading: false });
            return;
        }
        if (state.yearSection == '') {
            setState({ yearError: 'Please select year ', loading: false });
            return;
        }

        for (const file of state.files) {
            if (!file.file) {
                setState({ errorMessage: 'Please upload a file ', loading: false });
                return;
            } else if (!file.subtitle) {
                setState({ errorMessage: 'Please enter a name ', loading: false });
                return;
            }
        }
        const formData = new FormData();
        const outputArray = state.files.map((item, index) => {
            return {
                [`list${index + 1}`]: item.subtitle,
                [`file-pdf-${index + 1}`]: item.file,
            };
        });
        console.log('outputArray: ', outputArray);

        outputArray.forEach((item) => {
            Object.keys(item).forEach((key) => {
                formData.append(key, item[key]);
            });
        });
        formData.append('title', state.name);
        formData.append('yearselection', state.yearSection.label);
        formData.append('_wpcf7', '3759');
        formData.append('_wpcf7_unit_tag', 'wpcf7-f3650-p3651-o1');

        try {
            const token = localStorage.getItem('kprToken');
            const res: any = await axios.post(`https://file.kprmilllimited.com/wp-json/contact-form-7/v1/contact-forms/3759/feedback`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setState({ isOpen: false, name: '', yearSection: '', files: [{ subtitle: '', file: null }], loading: false, nameError: '', yearError: '' });
            getData();
            Success(res?.data?.message);
        } catch (error) {
            setState({ loading: false });
            console.error('Error:', error);
        }
    };

    const handleFileChange = (e, index) => {
        const newFiles = [...state.files];
        const file = e.target.files[0];
        if (file) {
            newFiles[index] = { ...newFiles[index], file };
            setState({ files: newFiles, errorMessage: '' });
        }
    };

    const handleNameChange = (e, index) => {
        const newFiles = [...state.files];
        newFiles[index] = { ...newFiles[index], subtitle: e.target.value };
        setState({ files: newFiles, errorMessage: '' });
    };

    const handleRemove = (index, item) => {
        const newFiles = [...state.files];
        state.files.splice(index, 1);
        setState({ files: state.files });
    };

    const handleAddFile = () => {
        for (const file of state.files) {
            if (!file.file) {
                setState({ errorMessage: 'Please upload a file ' });
                return;
            }
            if (!file.subtitle) {
                setState({ errorMessage: 'Please enter a name ' });
                return;
            }
        }
        setState({
            files: [...state.files, { subtitle: '', file: null }],
            errorMessage: '',
        });
    };

    const yearOptions = [];
    for (let year = 2001; year <= 2026; year++) {
        yearOptions.push({ value: year, label: year.toString() });
    }

    const deleteData = (record) => {
        showDeleteAlert(
            async () => {
                try {
                    const token = localStorage.getItem('kprToken');
                    const config = {
                        method: 'delete',
                        url: `https://file.kprmilllimited.com/wp-json/cf7-api/v1/forms/3759/submissions/${record.id}`,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    };

                    await axios.request(config);
                    const filteredData = state.parsedData.filter((dataRecord) => dataRecord.id !== record.id);
                    setState({ parsedData: filteredData });
                    getData();

                    Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
                } catch (error) {
                    console.log('error:', error);
                    Swal.fire('Error', 'Failed to delete data.', 'error');
                }
            },
            () => {
                Swal.fire('Cancelled', 'Your data list is safe :)', 'error');
            }
        );
    };

    return (
        <div>
            <div className="panel mb-5 flex items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                    <h5 className="text-lg font-semibold dark:text-white-light">Share Holding Pattern</h5>
                </div>
                <div>
                    <button type="button" className="btn btn-primary  w-full md:mb-0 md:w-auto" onClick={() => setState({ isOpen: true, update: false, name: '' })}>
                        + Create
                    </button>
                </div>
            </div>
            <div className="datatables">
                <DataTable
                    className="table-hover whitespace-nowrap"
                    records={state.parsedData}
                    columns={[
                        { accessor: 'title', title: 'Title' },
                        { accessor: 'year' },
                        {
                            accessor: 'link',
                            title: 'Link',
                            render: (item: any) =>
                                item?.link?.map((item) => (
                                    <div className="flex flex-row items-center justify-center">
                                        <a href={item['file-pdf-cfdb7_file']} target="_blank" rel="noopener noreferrer">
                                            <Image src={pdf} width={30} height={30} alt="Picture of the author" />
                                            Download
                                        </a>
                                    </div>
                                )),
                        },

                        {
                            // Custom column for actions
                            accessor: 'actions', // You can use any accessor name you want
                            title: 'Actions',
                            // Render method for custom column
                            render: (row: any) => (
                                <>
                                    {/* <Tippy content="Edit">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // const url = row?.link?.split('/').pop();
                                                // //    const res= urlToFile(row?.link,url)
                                                // urlToFile(row?.link, url).then((file) => {
                                                //     console.log(file);
                                                //     // Output: File object with the specified name
                                                // });
                                                setState({ isOpen: true, name: row?.title, update: true });
                                            }}
                                        >
                                            <IconPencil className="ltr:mr-2 rtl:ml-2" />
                                        </button>
                                    </Tippy> */}
                                    <Tippy content="Delete">
                                        <button type="button" onClick={() => deleteData(row)}>
                                            <IconTrashLines />
                                        </button>
                                    </Tippy>
                                </>
                            ),
                        },
                    ]}
                    highlightOnHover
                    totalRecords={state.parsedData.length}
                    recordsPerPage={10}
                    page={state.page}
                    onPageChange={(p) => setState({ page: p })}
                    recordsPerPageOptions={state.PAGE_SIZES}
                    onRecordsPerPageChange={null}
                    sortStatus={null}
                    onSortStatusChange={() => {}}
                    selectedRecords={null}
                    onSelectedRecordsChange={(selectedRecords) => {}}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
            <Modal
                addHeader={`Add`}
                open={state.isOpen}
                close={() => setState({ isOpen: false, errorMessage: '', name: '', nameError: '', yearError: '', yearSection: '', files: [{ subtitle: '', file: null }] })}
                renderComponent={() => (
                    <div className=" p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    id="name"
                                    placeholder="Enter Title"
                                    className="form-input mt-1 block w-full"
                                    value={state.name}
                                    onChange={(e) => setState({ name: e.target.value, nameError: '' })}
                                />
                                {state.nameError && <div className="mb-2 text-red-500">{state.nameError}</div>}

                                <div className=" mt-3" style={{ width: '100%' }}>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Year
                                    </label>
                                    <Select
                                        placeholder="Select an option"
                                        value={state.yearSection}
                                        onChange={(val) => setState({ yearSection: val, yearError: '' })}
                                        options={yearOptions}
                                        isSearchable={true}
                                    />
                                </div>
                                {state.yearError && <div className="mb-2 text-red-500">{state.yearError}</div>}
                            </div>
                            {state.files?.length > 0 && (
                                <div className="mt-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Files
                                    </label>
                                    {state.files.map((item, index) => (
                                        <div key={index} className={`mb-3 flex items-center space-x-2`}>
                                            {item.file ? (
                                                <div>{item.file.name}</div>
                                            ) : (
                                                <input
                                                    type="file"
                                                    className="rtl:file-ml-5 form-input p-0 file:border-0 file:bg-primary/90 file:px-4 file:py-2 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5"
                                                    accept=".pdf"
                                                    onChange={(e) => handleFileChange(e, index)}
                                                />
                                            )}
                                            <input
                                                name="name"
                                                type="text"
                                                id="name"
                                                placeholder="Enter Name"
                                                className="form-input block w-full"
                                                value={item.subtitle}
                                                onChange={(e) => handleNameChange(e, index)}
                                            />
                                            {item.file && (
                                                <a href={URL.createObjectURL(item.file)} target="_blank" rel="noopener noreferrer">
                                                    <IconEye />
                                                </a>
                                            )}
                                            {state.files.length > 1 && (
                                                <button type="button" className="text-red-500" onClick={() => handleRemove(index, item)}>
                                                    <IconTrashLines />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {state.errorMessage && <div className="mb-2 text-red-500">{state.errorMessage}</div>}
                            {state.files?.length < 12 && (
                                <div className="flex ">
                                    <button type="button" className="btn btn-primary" onClick={handleAddFile}>
                                        Add File
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button type="submit" className="btn btn-primary !mt-6">
                                    {state.loading ? <IconLoader className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            />
        </div>
    );
}

export default PrivateRouter(ShareHoldingPattern);
