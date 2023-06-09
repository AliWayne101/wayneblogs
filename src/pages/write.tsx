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
import Error from '@/components/Error'
import { Details } from '@/configs'

const Write = () => {
    const [Verified, setVerified] = useState(false);
    const [photo, setPhoto] = useState<File | null>();
    const [isUploaded, setIsUploaded] = useState(false);
    const [photoLink, setPhotoLink] = useState('');

    const [postUploading, setPostUploading] = useState(false);
    const [bing, setBing] = useState(true);
    const [titleURL, setTitleURL] = useState('');

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    const [firstText, setFirstText] = useState('');
    const [firstDesc, setFirstDesc] = useState('');
    const [TOC, setTOC] = useState('');
    const [inpageImage, setInpageImage] = useState('');
    const [FAQ, setFAQ] = useState('');

    const [editorContent, setEditorContent] = useState<string>('');

    const _router = useRouter();

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
                    photoLink,
                    firstText,
                    firstDesc,
                    TOC,
                    inpageImage,
                    FAQ
                });

                if (response.data.posted === true) {
                    setTitleURL(response.data.titleurl);
                    const submitData = {
                        siteUrl: Details.siteUrl,
                        url: `${Details.siteUrl}/blog/${response.data.titleurl}`
                    }
                    const submitHeaders = {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    }
                    axios.post(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${process.env.NEXT_PUBLIC_BING_API!}`,
                        submitData,
                        submitHeaders
                    ).then((_response) => {
                        if (_response.data.d === null) {
                            _router.push(`/blog/${response.data.titleurl}`);
                        } else
                            setBing(false);
                    }).catch((err) => {
                        console.log(err);
                        setBing(false);
                    });
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
                            bing ? (
                                <Loading />
                            ) : (
                                <>
                                    <Error text={'Unable to add the page to bing search console, kindly submit it manually'} />
                                    <Button text={'Page link'} link={`/blog/${titleURL}`} />
                                </>
                            )
                        ) : (
                            <>
                                <div className="admin">
                                    <h1>Add new post</h1>
                                    <div className="admin-input">
                                        <input type="text" name="author" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Uploaded by' />
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                                    </div>
                                    <div className="admin-input">
                                        <textarea name="desc" id="desc" cols={30} rows={10} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Short Description' />
                                    </div>
                                    <div className="admin-input">
                                        <input name="firsttext" id="firsttext" value={firstText} onChange={(e) => setFirstText(e.target.value)} placeholder='Entry Heading Text' />
                                    </div>
                                    <div className="admin-input">
                                        <input name="firstdesc" id="firstdesc" value={firstDesc} onChange={(e) => setFirstDesc(e.target.value)} placeholder='Entry Heading Description' />
                                    </div>
                                    <div className="admin-body">
                                        <RichTextEditor value={editorContent} onChange={handleEditorChange} />
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="toc" id="toc" value={TOC} onChange={(e) => setTOC(e.target.value)} placeholder='Table of Contents (# separated)' />
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="ipimage" id="ipimage" value={inpageImage} onChange={(e) => setInpageImage(e.target.value)} placeholder='Inpage Image Link' />
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="FAQ" id="FAQ" value={FAQ} onChange={(e) => setFAQ(e.target.value)} placeholder='FAQ format -> Question;Answer#' />
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="tags" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Tags (comma separated, no-space)' />
                                    </div>
                                    <div className="admin-input">
                                        <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category' />
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