@extends('layout.base')

@section('tittle',  'C-19 | Grafik')

@section('custom CSS')
    <link href="{{ asset('styles/css/loader.css') }}" rel="stylesheet">
@endsection

@section('content')
    {{-- @include('layout.loader') --}}
    @include('layout.header')
    <div class="container-fluid">
        <div class="row">
            {{-- Include The Sidebar --}}
            @include('layout.sidebar')
            {{-- Main Content --}}
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {{-- Graphic --}}
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Kasus Covid-19 di Dunia</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                            <button type="button" id="export-canvas" class="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" id="tempo-selector" data-bs-toggle="dropdown" aria-expanded="false">
                            <span data-feather="calendar"></span>
                            Tempo : 7 Hari
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="tempo-selector">
                            <li><a class="dropdown-item" id="set-7">7 hari</a></li>
                            <li><a class="dropdown-item" id="set-30">30 hari</a></li>
                            <li><a class="dropdown-item" id="set-100">100 hari</a></li>
                        </ul>
                    </div>
                </div>
                <canvas class="my-4 w-100" id="myChart" width="900" height="380" role="img" aria-label="">
                </canvas>
            </main>
        </div>
    </div>
@endsection

@section('custom JS')
    <script src="{{ asset('styles/js/cases.js') }}"></script>
@endsection