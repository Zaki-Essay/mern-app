import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="container custom-container">
      <nav className="navbar custom-navbar">
        <div className="nav-left">
          <div href="/">
            <a className="custom-link">Accueil</a>
          </div>
        </div>
        <div className="nav-right">
          <div href="/login">
            <a className="custom-link">Connexion</a>
          </div>
          <div href="/register">
            <a className="custom-link">Inscription</a>
          </div>
        </div>
      </nav>

      <div className="content custom-content">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/DXC_Logo_2021_Purple_Black.png" alt="Logo" />
        </div>
        <div className="text">
          <h1 className="title custom-title">Bienvenue sur la Todo List Collaborative</h1>
          <p className="description custom-description">Gérez vos tâches efficacement et travaillez en collaboration.</p>
        </div>
        <div className="buttons custom-buttons">
          <Button variant="primary" href='/login' className="custom-button">Connexion</Button>
          <Button variant="info" href='/register' className="custom-button">Inscription</Button>
        </div>
      </div>

      <div className="image custom-image">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-work-late-at-night-6711673-5606416.png" alt="Photo" />
      </div>

      <style jsx>{`
        .custom-container {
          background-color: #fff;
          padding-top: 60px;
        }
        .custom-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #7340ff;
          color: #fff;
          padding: 10px 20px;
        }
        .custom-link {
          color: #fff;
          text-decoration: none;
          margin-right: 15px;
        }
        .custom-content {
          text-align: center;
          padding: 20px;
        }
        .custom-title {
          color: #7340ff;
          font-size: 28px;
          margin-bottom: 10px;
        }
        .custom-description {
          color: #000;
          margin-bottom: 20px;
        }
        .custom-buttons .custom-button {
          margin-right: 10px;
        }
        .custom-image {
          margin-left: auto;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
