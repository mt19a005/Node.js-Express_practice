#-*- coding:utf-8 -*-
import cv2
import numpy as np



def Anime(imgSrc, imgContour):
    imgContourNot = cv2.bitwise_not(imgContour)
    imgContourNotRGB = cv2.cvtColor(imgContourNot, cv2.COLOR_GRAY2RGB)
    imgDst = cv2.bitwise_and(imgSrc, imgContourNotRGB)
    return imgDst

def main():
    # 入力画像を読み込み
    imgSrc = cv2.imread("a.jpg")

    imgSrcGray = cv2.cvtColor(imgSrc, cv2.COLOR_RGB2GRAY)
    imgSrcGauss = cv2.GaussianBlur(imgSrcGray, ksize=(3, 3), sigmaX=1.3)


# -   -   -   -   処理    -   -   -   - #
    # Canny
    imgCanny = cv2.Canny(imgSrcGauss, 70, 150)

    # MORPH_GRADIENT
    kernel = np.ones((2, 2), np.uint8)
    imgGradient = cv2.morphologyEx(imgSrcGauss, cv2.MORPH_GRADIENT, kernel)
    imgGradientThresh = cv2.threshold(imgGradient, 20, 255, cv2.THRESH_BINARY)[1]

    # ラプラシアンフィルタ
    imgLaplacian = cv2.Laplacian(imgSrcGauss, cv2.CV_8UC1, ksize=3)


    imgSrcGray = cv2.cvtColor(imgSrcGray, cv2.COLOR_GRAY2RGB)
    imgCannyAnime = Anime(imgSrcGray, imgCanny)
    imgGradientAnime = Anime(imgSrcGray, imgGradientThresh)
    imgLaplacianAnime = Anime(imgSrcGray, imgLaplacian)

    # ラプシアンを拡大したもの・・・あんま使えない。
    # imgLaplacianDilate = cv2.morphologyEx(imgLaplacian, cv2.MORPH_DILATE, kernel)
    # imgLaplacianDilateAnime = Anime(imgSrc, imgLaplacianDilate)
    # cv2.imwrite("imgLaplacianDilate.jpg", imgLaplacianDilate)
    # cv2.imwrite("imgLaplacianDilateAnime.jpg", imgLaplacianDilateAnime)
    
    

# -   -   -   -   出力    -   -   -   - #
    cv2.imwrite("imgSrcGray.jpg", imgSrcGray)
    # cv2.imwrite("imgSrcGray.jpg", imgSrcGray)
    # cv2.imwrite("imgSrcGauss.jpg", imgSrcGauss)

    # cv2.imwrite("imgCanny.jpg", imgCanny)
    # cv2.imwrite("imgGradientThresh.jpg", imgGradientThresh)
    # cv2.imwrite("imgLaplacian.jpg", imgLaplacian)
    # cv2.imwrite("imgLaplacianCanny.jpg", imgLaplacianCanny)

    cv2.imwrite("imgCannyAnime.jpg", imgCannyAnime)
    cv2.imwrite("imgGradientAnime.jpg", imgGradientAnime)
    cv2.imwrite("imgLaplacianAnime.jpg", imgLaplacianAnime)

if __name__ == "__main__":  
    main()