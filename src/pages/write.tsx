import Button from '@/components/Button'
import Login from '@/components/admin/Login'
import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import axios from 'axios'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import RichTextEditor from '@/components/RichTextEditor'
import Loading from '@/components/Loading'

const Write = () => {
    const [Verified, setVerified] = useState(false);
    const [photo, setPhoto] = useState<File | null>();
    const [isUploaded, setIsUploaded] = useState(false);
    const [photoLink, setPhotoLink] = useState('');

    const [postUploading, setPostUploading] = useState(false);

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    const [editorContent, setEditorContent] = useState<string>('');

    const handleEditorChange = (value: string) => {
        setEditorContent(value);
    };

    const photoUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files[0]) {
            setPhoto(files[0])
        }
    }

    const uploadPost = async () => {
        if (isUploaded) {
            try {
                setPostUploading(true);
                const response = await axios.post('/api/createpost', {
                    author,
                    title,
                    desc,
                    editorContent,
                    tags,
                    category,
                    photoLink
                });

                if (response.data.posted === true) {
                    const _router = useRouter();
                    _router.push(`/blog/${response.data.titleurl}`);
                }
            } catch (err) {
                console.log(err);
                console.log('an Error was detected');
            }
        }
    }

    useEffect(() => {
        if (photo) {
            const formData = new FormData();
            console.log(process.env.NEXT_PUBLIC_IMG_BB!);
            formData.append('image', photo);
            axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    key: process.env.NEXT_PUBLIC_IMG_BB!
                }
            })
                .then((response) => {
                    setIsUploaded(true);
                    setPhotoLink(response.data.data.url);
                })
                .catch((err) => {
                    console.log(err);
                    console.log('Error Detected while uploading you photo');
                })
        }
    }, [photo]);

    return (
        <>
            <Head>
                <title>Admin - Wayne Blogs</title>
            </Head>
            <Navbar />
            <main>
                {
                    Verified ? (
                        postUploading ? (
                            <Loading />
                        ) : (
                            <>
                                <div className="admin">
                                    <h1>Add new post</h1>
                                    <div className="admin-input">
                                        <input type="text" name="author" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Uploaded by'/>
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                                    </div>
                                    <div className="admin-input">
                                        <textarea name="desc" id="desc" cols={30} rows={10} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Short Description' />
                                    </div>
                                    <div className="admin-body">
                                        <RichTextEditor value={editorContent} onChange={handleEditorChange} />
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="tags" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Tags (comma separated, no-space)' />
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category'/>
                                    </div>
                                    <div className="admin-input">
                                        <input type="file" name="photo-input" id="input-photo" onChange={photoUploaded} />
                                    </div>
                                    <span onClick={uploadPost}>
                                        <Button text='Add Post' link='' />
                                    </span>
                                </div>
                            </>
                        )
                    ) : (
                        <Login onChange={setVerified} value={Verified} />
                    )
                }

                <Footer />
            </main>
        </>
    )
}

export default Write