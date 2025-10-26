// src/components/StatusAnimation.jsx
import React from 'react';
//import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
//import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from 'lottie-react'

// CORREÇÃO AQUI: Adicione a extensão .json
import successAnim from '../../features/splash/assets/animations/success_anim.json'
import errorAnim from '../../features/splash/assets/animations/error_anim.json'
import loadingAnim from '../../features/splash/assets/animations/loading_anim.json'

import { StatusType } from '../store/modal-store'; // Importe o enum

const StatusAnimation = ({ statusType }) => {
  switch (statusType) {
    case StatusType.LOADING:
      return (
        <div className="flex items-center justify-center">
          <Lottie animationData={loadingAnim} loop={true} />
        </div>
      );
    case StatusType.OK:
      return (
        <div className="flex items-center justify-center">
          <Lottie animationData={successAnim} loop={false} />
        </div>
      );
    case StatusType.FAIL:
      return (
        <div className="flex items-center justify-center">
          <Lottie animationData={errorAnim} loop={false} />
        </div>
      );
    default:
      return null;
  }
};

export default StatusAnimation;