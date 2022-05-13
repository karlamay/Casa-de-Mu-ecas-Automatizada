import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

StepPins = [24,25,8,7]

for pin in StepPins:
        GPIO.setup(pin,GPIO.OUT)
        GPIO.output(pin, False)

WaitTime = 0.005

StepCount = 8
Seq = []
Seq = [i for i in range(0, StepCount)]
Seq[0] = [1,0,0,0]
Seq[1] = [1,1,0,0]
Seq[2] = [0,1,0,0]
Seq[3] = [0,1,1,0]
Seq[4] = [0,0,1,0]
Seq[5] = [0,0,1,1]
Seq[6] = [0,0,0,1]
Seq[7] = [1,0,0,1]

def steps(nb):
        StepCounter = 0
        if nb<0: sign=-1
        else: sign=1
        nb=sign*nb*2
        for i in range(nb):
                for pin in range(4):
                        xpin = StepPins[pin]
                        if Seq[StepCounter][pin]!=0:
                                GPIO.output(xpin, True)
                        else:
                                GPIO.output(xpin, False)
                StepCounter += sign

                if (StepCounter==StepCount):
                        StepCounter = 0
                if (StepCounter<0):
                        StepCounter = StepCount-1
                
                time.sleep(WaitTime)


nbStepsPerRev=2048
if __name__ == '__main__' :
    hasRun=False
    while not hasRun:
            steps(nbStepsPerRev)
            time.sleep(1)
            hasRun=True

    for pin in StepPins:
            GPIO.output(pin, False)