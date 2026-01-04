<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnboardingCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) return $next($request);

        if ($request->routeIs('onboarding.*')) {
            return $next($request);
        }

        if (! $user->onboarding_completed) {
            // return redirect('/onboarding');
            return redirect()->route('onboarding.index');
        }

        return $next($request);
    }
}
