"use client"
import React, { useEffect, useState } from 'react'
import DeleteButton from "../components/DeleteButton";
import UserTabs from '../components/layout/UserTabs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState<string>('');
    const [categories, setCategories] = useState<any>([]);
    const [editedCategory, setEditedCategory] = useState<any>(null);
    const handleCategorySubmit = async (ev: any) => {
        ev.preventDefault();

        await fetch('/api/category', {
            method: editedCategory ? 'PUT' : 'POST',
            body: JSON.stringify({
                name: categoryName,
                ...editedCategory ? { _id: editedCategory._id } : {},
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            console.log("res", res)
            if (res.ok) {
                toast.success(editedCategory ? 'Category updated!' : 'Category created!');
            }
        });
        setCategoryName('');
        setEditedCategory(null);
        getCategories();
    }
    const getCategories = () => {
        fetch('/api/category').then(res => {

            res.json().then(data => {
                setCategories(data);
            })

        }
        )
    };
    const deleteCategory = (id: any) => {
        fetch(`/api/category?_id=${id}`, {
            method: 'DELETE',

        }).then(res => {
            console.log("res", res)
            if (res.ok) {
                toast.success('Deleted successfully!');
            }
        });
        setEditedCategory(null);
        getCategories();

    }

    useEffect(() => {
        fetch('/api/category').then(res => {

            res.json().then(data => {
                setCategories(data);
            })

        }
        )

    }, [])
    return (
        <section>
            <UserTabs />
            <form className='w-96 m-auto '>
                <div className=''>
                    <label>Category Name</label>
                </div>
                <div className='flex items-start gap-2'>

                    <input className='' onChange={(e) => setCategoryName(e.target.value)} value={categoryName} type='text' placeholder='Category'></input>
                    <button onClick={handleCategorySubmit} className='w-1/3 bg-red-500 m-0' type='submit'>{editedCategory ? 'Update' : 'Create'}</button>
                </div>

            </form>
            <div className='w-96 m-auto'>
                <h2>Edit Categories:</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div
                        key={c._id}
                        className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                        <div className="grow">
                            {c.name}
                        </div>
                        <div className="flex gap-1">
                            <button type="button"
                                onClick={() => {
                                    setEditedCategory(c);
                                    setCategoryName(c.name);
                                }}
                            >
                                Edit
                            </button>
                            <DeleteButton
                                label="Delete"
                                onDelete={() => deleteCategory(c._id)} />
                        </div>
                    </div>
                ))}

            </div>

        </section>
    )
}
