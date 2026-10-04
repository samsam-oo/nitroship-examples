<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HelloController extends AbstractController
{
    #[Route('/', name: 'home', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('hello.html.twig', [
            'request_time' => (new \DateTimeImmutable('now', new \DateTimeZone('UTC')))->format(\DateTimeInterface::ATOM),
        ]);
    }

    #[Route('/api/hello', name: 'api_hello', methods: ['GET'])]
    public function hello(): JsonResponse
    {
        return $this->json([
            'message' => 'Nitroship Symfony',
            'requestTime' => (new \DateTimeImmutable('now', new \DateTimeZone('UTC')))->format(\DateTimeInterface::ATOM),
        ]);
    }
}
