import React from 'react'
import Head from 'next/head'
import store from '../redux/store'
import Review from './Review'
import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => (
    <li tabIndex={0}>
        <Review 
            id={value.key} 
            title= {value.title}
            description={value.description} 
            image={value.image}
        />
    </li>
  ));

const SortableList = SortableContainer(({items}) => {
return (
    <ul>
    {console.log("ITEMS ", items)}
    {items.map((temp, index) => (
        <SortableItem key={`item-${temp}`} index={index} value={temp} />
    ))}
    </ul>
)
});

const select = state => state
function EditReview() {
    const reviews = useSelector(select)
    const dispatch = useDispatch()

    const onSortEnd = ({oldIndex, newIndex}) => {
        // console.log("old and new ind ",oldIndex, newIndex)
        dispatch({type: 'move', payload: {oldInd: oldIndex, newInd: newIndex}})
    }

    return (
        <div>
            <Head>
                <title> Edit review </title>
                <meta name="Edit review" content="Edit, delete and change the order of your reviews here"/>
            </Head>
            <h1>Edit Reviews</h1>
            <ul>
            <li>
                <Link href="../">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/WriteReview">
                    <a>Write a review</a>
                </Link>
            </li>
            <li>
                <Link href="/EditReview">
                    <a>Edit reviews</a>
                </Link>
            </li>
            </ul>
            <SortableList items={reviews} 
                onSortEnd={onSortEnd}
            />
        </div>
    )
}

export default EditReview
