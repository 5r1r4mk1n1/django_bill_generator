import subprocess
import webbrowser
import sys

try:
    result = subprocess.run(['pip', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode != 0:
        raise ImportError
except (ImportError, FileNotFoundError):
    if sys.platform == 'win32':
        subprocess.call(['python', '-m', 'ensurepip', '--default-pip'])
    else:
        subprocess.call(['sudo', 'apt-get', 'install', 'python3-pip'])

try:
    import django
except ImportError:
    subprocess.call(['pip', 'install', 'django'])

try:
    import reportlab
except ImportError:
    subprocess.call(['pip', 'install', 'reportlab'])

subprocess.Popen(['python', 'manage.py', 'runserver'],shell=False)

webbrowser.open('http://127.0.0.1:8000')
