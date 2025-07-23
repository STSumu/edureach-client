import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import { EnrollContext } from '../context/EnrollmentProvider';

const Payment = () => {
    const { baseUrl, dbUser } = useContext(authContext);
    const [payment, setPayment] = useState([]);
    const { refreshEnrollments } = useContext(EnrollContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${baseUrl}/pay/${dbUser.user_id}`)
            .then(res => res.json())
            .then(data => setPayment(data));
    }, [])
    if (payment.length === 0) {
        return <Loading></Loading>
    }
    const {
        amount
        ,
        paid_at
        ,
        payment_method
        ,
        order_id,

    } = payment[0];
    const handleConfirmPayment = () => {
        fetch(`${baseUrl}/pay`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId: order_id, paymentStatus: 'successful' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.updated > 0) {
                    Swal.fire({
                        title: "Payment Successful",
                        icon: "success",            
                        confirmButtonText: "Ok",
                        width: '40%',                
                        maxWidth: '600px',
                        padding: '1.5rem',
                        background: '#f0f9ff',       
                        color: '#0b3954',            
                        customClass: {
                            popup: 'rounded-xl shadow-lg', 
                            confirmButton: 'bg-[#B14E0F] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#953c08]'  // Stylish confirm button
                        },
                        showClass: {
                            popup: `
                                  animate__animated
                                  animate__fadeInUp
                                  animate__faster`
                        },
                        hideClass: {
                            popup: `
                                  animate__animated
                                animate__fadeOutDown
                                animate__faster`
                        }
                    })
                        .then(async() => {
                            await refreshEnrollments();
                            fetch(`${baseUrl}/cart/clear`, {
                                method: 'DELETE',
                                body: JSON.stringify({ stdId: dbUser.user_id }),
                                headers: { 'Content-Type': 'application/json' }
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.success) {
                                        navigate('/');
                                    }
                                    else {
                                        alert('cart clear failed')
                                    }
                                });
                        });
                }
            }
            )
    };
    const handleCancelPayment = () => {
        fetch(`${baseUrl}/pay`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId: order_id, paymentStatus: 'failed' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.updated > 0) {
                    Swal.fire({
                        title: "Payment Failed",
                        confirmButtonText: `Ok`,
                        showClass: {
                            popup: `
                                  animate__animated
                                  animate__fadeInUp
                                  animate__faster`
                        },
                        hideClass: {
                            popup: `
                                  animate__animated
                                animate__fadeOutDown
                                animate__faster`
                        }
                    })
                        .then(
                            navigate('/')
                        )
                }
            })
    }
    return (
        <div className="mt-10 md:mt-9 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2EEEC] to-white px-4">
            <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 text-center">
                {/* <CheckCircle className="text-blue-600 mx-auto mb-4" size={60} /> */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Confirmed</h2>
                <p className="text-gray-600 mb-6">Your payment was processed successfully.</p>

                <div className="bg-[#F2EEEC] text-left rounded-lg p-4 text-sm mb-6">
                    <p><span className="font-medium">Amount Paid:</span> {amount}</p>
                    <p><span className="font-medium">Date:</span> {paid_at ? new Date(paid_at).toLocaleString() : 'N/A'}</p>
                    <p><span className="font-medium">Payment Method:</span> {payment_method}</p>
                </div>

                <div className='flex gap-4 justify-center'>
                    <button onClick={handleCancelPayment} className='btn border-1 border-[#B14E0F] text-[#B14E0F]'>Cancel Payment</button>
                    <button onClick={handleConfirmPayment} className='btn bg-[#B14E0F] text-white'>Confirm Payment</button>
                </div>
            </div>
        </div>
    );
};

export default Payment;