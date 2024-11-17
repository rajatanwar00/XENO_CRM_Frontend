import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

function Audience() {

    const navigate=useNavigate()
    const backendURL=import.meta.env.VITE_APIURL;

    const token=localStorage.getItem('jwtToken')
    const today = new Date(); 
    const formattedDate = today.toISOString().split('T')[0];

    const [spending,setSpending]=useState(0)
    const [visits,setVisits]=useState(0)
    const [lastvisit,setLastVisit]=useState(formattedDate)

    const [spendingCondition,setSpendingCondition]=useState('greater')
    const [visitsCondition,setVisitsCondition]=useState('greater')
    const [lastvisitCondition,setLastVisitCondition]=useState('before')

    const [records,setRecords]=useState()

    const [campaignName,setCampaignName]=useState('')
    const [campaignDesc,setCampaignDesc]=useState('')


    useEffect(()=>{
        const token=localStorage.getItem('jwtToken');

        if(!token){
            navigate('')
        }
    },[])

    function calculate(e){
        e.preventDefault()
        
        
        const filterdata={
            spending,
            spendingCondition,
            visits,
            visitsCondition,
            lastvisit,
            lastvisitCondition
        }

        axios.post(`${backendURL}/customers/filter`,filterdata,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response)=>{
            console.log(response)
            setRecords(response.data[0]['count(*)'])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function handleConditionChange(field, condition){
        if (field === 'spending') {
          setSpendingCondition(condition);
        } else if (field === 'visits') {
          setVisitsCondition(condition);
        } else if (field === 'lastvisit') {
          setLastVisitCondition(condition);
        }
    }

    function createCampaign(e){
        e.preventDefault;

        const data={
            campaignName,
            campaignDesc,
            criteria:{
                spending,
                spendingCondition,
                visits,
                visitsCondition,
                lastvisit,
                lastvisitCondition
            }
        }

        axios.post(`${backendURL}/campaign`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response)=>{
            console.log(response)
            navigate('/campaign')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    

  return (
    <div className='h-screen p-2'>
        <div className='p-20 pt-5 pb-5 '>
            <div className='border p-5 shadow-xl'>
                <div className='flex justify-center items-center p-3'>
                    <p className='text-2xl font-bold'>Filter your Audience</p>
                </div>

                <br/>

                <div className='p-5  flex justify-between'>
                    <div className='border rounded-lg shadow-lg p-5'>
                        <div className='p-2 flex justify-center items-center'>
                            <p className=' text-lg font-medium'>Total Spending</p>
                        </div>
                        <br/>
                        <div className='p-1 flex flex-col justify-around'>
                            <div className='flex flex-col justify-between'>
                                <label className='items-center'>
                                    <input type='radio' name='spendingCondition' value='greater' checked={spendingCondition == 'greater'} onChange={() => handleConditionChange('spending', 'greater')}/> Greater than
                                </label>

                                <label className='items-center'>
                                    <input type='radio' name='spendingCondition' value='less' checked={spendingCondition == 'less'} onChange={() => handleConditionChange('spending', 'less')}/> Less than
                                </label>
                            </div>
                            <br/>
                            <div>
                                <input type='number' className='border' placeholder=' Amount' min='0' value={spending} onChange={(e) => setSpending(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className='border rounded-lg shadow-lg p-5'>
                        <div className='p-2 flex justify-center items-center'>
                            <p className='font-medium text-lg'>Number of visits</p>
                        </div>
                        <br/>
                        <div className='p-1 flex flex-col justify-around'>
                            <div className='flex flex-col justify-between'>
                                <label className='items-center'>
                                    <input type='radio' name='visitsCondition' value='greater' checked={visitsCondition=='greater'} onChange={() => handleConditionChange('visits', 'greater')}/> Greater than
                                </label>

                                <label className='items-center'>
                                    <input type='radio' name='visitsCondition' value='less' checked={visitsCondition=='less'} onChange={() => handleConditionChange('visits', 'less')}/> Less than
                                </label>
                            </div>
                            <br/>
                            <div>
                                <input type='number' className='border' placeholder=' Amount' min='0' value={visits} onChange={(e) => setVisits(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className='border rounded-lg shadow-lg p-5'>
                        <div className='p-2 flex justify-center items-center'>
                            <p className='font-medium text-lg '>Last Visit</p>
                        </div>
                        <br/>
                        <div className='p-1 flex flex-col justify-around'>
                            <div className='flex flex-col justify-between'>
                                <label className='items-center'>
                                    <input type='radio' name='lastvisitCondition' value='before' checked={lastvisitCondition=='before'} onChange={() => handleConditionChange('lastvisit', 'before')}/> Before
                                </label>

                                <label className='items-center'>
                                    <input type='radio' name='lastvisitCondition' value='after' checked={lastvisitCondition=='after'} onChange={() => handleConditionChange('lastvisit', 'after')}/> After
                                </label>
                            </div>
                            <br/>
                            <div>
                                <input type='date' className='border px-1'  value={formattedDate} onChange={(e) => setLastVisit(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <br/>

                <div className='flex justify-center items-center'>
                    <div className='flex items-center'>
                        <p>Number of records: </p>
                        <label className='block text-md px-10'>{records}</label> 
                        <button type='submit' className='bg-green-600 py-1 px-2 text-white border font-serif rounded hover:bg-green-500' onClick={(e)=>calculate(e)}>Calculate</button>
                    </div>
                    
                </div>

                <br/>
                <hr/>
                <br/>

                <div className='flex justify-center items-center'>
                    <div className='flex items-center justify-between'>
                        <div className='p-2'>
                            <div className='p-2'>
                                <label>Campaign Name: </label>
                                <input type='text' className='border px-1' value={campaignName} onChange={(e) => setCampaignName(e.target.value)}/>
                            </div>

                            <div className='p-2'>
                                <label>Campaign Description :</label>
                                <input type='text' className='border px-1' value={campaignDesc} onChange={(e) => setCampaignDesc(e.target.value)}/> 
                            </div>
                        </div>

                        <div className='p-2'>
                            <div className='p-2'>
                                <button type='submit' className='bg-green-600 py-1 px-2 text-white border font-serif rounded hover:bg-green-500' onClick={(e)=>createCampaign(e)}>Create</button>
                            </div>
                        </div>                     
                    </div>                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Audience